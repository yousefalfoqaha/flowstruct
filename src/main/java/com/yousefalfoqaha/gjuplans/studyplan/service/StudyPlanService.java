package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanDtoMapper;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.studyplan.domain.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.*;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanGraphService studyPlanGraphService;
    private final StudyPlanDtoMapper studyPlanDtoMapper;
    private final ObjectValidator<StudyPlanDetailsDto> studyPlanDetailsValidator;
    private final ObjectValidator<SectionDetailsDto> sectionDetailsValidator;

    public StudyPlanDto getStudyPlan(long studyPlanId) {
        var studyPlan = findStudyPlan(studyPlanId);
        return studyPlanDtoMapper.apply(studyPlan);
    }

    public List<StudyPlanSummaryDto> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlanSummaries();
    }

    public StudyPlanWithSequencesDto getStudyPlanWithSequences(long studyPlanId) {
        var studyPlan = findStudyPlan(studyPlanId);

        var studyPlanResponse = studyPlanDtoMapper.apply(studyPlan);

        var courseSequencesMap = studyPlanGraphService.buildStudyPlanSequences(
                studyPlanResponse.coursePrerequisites(),
                studyPlan.getSections()
                        .stream()
                        .flatMap(s -> s.getCourses().keySet().stream())
                        .toList()
        );

        var courseSequences = courseSequencesMap.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            var sequences = entry.getValue();
                            return new CourseSequencesDto(
                                    sequences.getPrerequisiteSequence()
                                            .stream()
                                            .filter(prerequisiteSequenceId -> {
                                                var prerequisites = studyPlanResponse.coursePrerequisites().get(entry.getKey());
                                                if (prerequisites == null) return true;

                                                return prerequisites.keySet()
                                                        .stream()
                                                        .noneMatch(prerequisiteId -> Objects.equals(prerequisiteId, prerequisiteSequenceId));
                                            })
                                            .collect(Collectors.toSet()),
                                    sequences.getPostrequisiteSequence(),
                                    sequences.getLevel()
                            );
                        }
                ));

        return new StudyPlanWithSequencesDto(
                studyPlanResponse.id(),
                studyPlanResponse.year(),
                studyPlanResponse.duration(),
                studyPlanResponse.track(),
                studyPlanResponse.isPrivate(),
                studyPlanResponse.program(),
                studyPlanResponse.sections(),
                studyPlanResponse.coursePlacements(),
                studyPlanResponse.coursePrerequisites(),
                studyPlanResponse.courseCorequisites(),
                courseSequences
        );
    }

    @Transactional
    public StudyPlanDto toggleVisibility(long studyPlanId) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.setPrivate(!studyPlan.isPrivate());

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto moveCourseToSemester(
            long studyPlanId,
            long courseId,
            CoursePlacementDto targetPlacement
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        if (targetPlacement.year() > studyPlan.getDuration() || targetPlacement.year() <= 0) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        var oldPlacement = studyPlan.getCoursePlacements().get(courseId);
        var newPlacement = new CoursePlacement(
                AggregateReference.to(courseId),
                targetPlacement.year(),
                targetPlacement.semester(),
                targetPlacement.position(),
                targetPlacement.span()
        );

        if (oldPlacement == null) {
            throw new CourseNotPlacedException("Course was not already placed in the program map.");
        }

        if (comparePlacement(oldPlacement, newPlacement) == 0 && oldPlacement.getPosition() == newPlacement.getPosition()) {
            throw new InvalidCoursePlacement("Course is already in the same place");
        }

        boolean prerequisitesFulfilled = studyPlan.getCoursePrerequisites()
                .stream()
                .filter(cp -> Objects.equals(cp.getCourse().getId(), courseId))
                .allMatch(cp -> {
                    var prerequisitePlacement = studyPlan.getCoursePlacements().get(cp.getPrerequisite().getId());

                    if (prerequisitePlacement == null) {
                        return true;
                    }

                    return comparePlacement(prerequisitePlacement, newPlacement) < 0;
                });

        if (!prerequisitesFulfilled) {
            throw new InvalidCoursePlacement("Cannot place a course in the same or earlier term as its prerequisite");
        }

        boolean postrequisitesFulfilled = studyPlan.getCoursePrerequisites()
                .stream()
                .filter(cp -> Objects.equals(cp.getPrerequisite().getId(), courseId))
                .allMatch(cp -> {
                    var postrequisitePlacement = studyPlan.getCoursePlacements().get(cp.getCourse().getId());

                    if (postrequisitePlacement == null) {
                        return true;
                    }

                    return comparePlacement(postrequisitePlacement, newPlacement) > 0;
                });

        if (!postrequisitesFulfilled) {
            throw new InvalidCoursePlacement("Cannot place a course in the same or later term as its postrequisite");
        }

        deleteCoursePlacement(studyPlan, oldPlacement);
        insertCoursePlacement(studyPlan, newPlacement);

        return saveAndMapStudyPlan(studyPlan);
    }

    private int comparePlacement(CoursePlacement p1, CoursePlacement p2) {
        if (p1.getYear() != p2.getYear()) {
            return Integer.compare(p1.getYear(), p2.getYear());
        }
        return Integer.compare(p1.getSemester(), p2.getSemester());
    }

    private void shiftRows(StudyPlan studyPlan, CoursePlacement placement, int delta) {
        studyPlan.getCoursePlacements().values()
                .stream()
                .filter(p ->
                        p.getYear() == placement.getYear() &&
                                p.getSemester() == placement.getSemester() &&
                                p.getPosition() >= placement.getPosition()
                )
                .forEach(p -> p.setPosition(p.getPosition() + delta));
    }

    @Transactional
    public StudyPlanDto placeCoursesInSemester(long studyPlanId, List<Long> courseIds, CoursePlacementDto targetPlacement) {
        var studyPlan = findStudyPlan(studyPlanId);
        var coursePrerequisitesMap = studyPlan.getCoursePrerequisitesMap();

        if (targetPlacement.year() > studyPlan.getDuration() || targetPlacement.year() <= 0) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        int lastPosition = studyPlan.getCoursePlacements().values()
                .stream()
                .filter(currentCoursePlacement ->
                        comparePlacement(
                                new CoursePlacement(
                                        null,
                                        targetPlacement.year(),
                                        targetPlacement.semester(),
                                        1,
                                        1
                                ),
                                currentCoursePlacement
                        ) == 0
                )
                .mapToInt(CoursePlacement::getPosition)
                .max()
                .orElse(0);

        for (var courseId : courseIds) {
            if (studyPlan.getCoursePlacements().containsKey(courseId)) {
                throw new CourseAlreadyAddedException("A course already exists in the program map.");
            }

            var individualCoursePlacement = new CoursePlacement(
                    AggregateReference.to(courseId),
                    targetPlacement.year(),
                    targetPlacement.semester(),
                    ++lastPosition,
                    1
            );

            var prerequisites = coursePrerequisitesMap.get(courseId);

            if (prerequisites != null) {
                prerequisites.forEach(prerequisite -> {
                    var prerequisitePlacement = studyPlan.getCoursePlacements().get(prerequisite.getPrerequisite().getId());
                    if (prerequisitePlacement == null || comparePlacement(prerequisitePlacement, individualCoursePlacement) >= 0) {
                        throw new InvalidCoursePlacement("A course has missing prerequisites or has prerequisites in later semesters.");
                    }
                });
            }

            studyPlan.getCoursePlacements().put(courseId, individualCoursePlacement);
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto editStudyPlanDetails(long studyPlanId, StudyPlanDetailsDto details) {
        studyPlanDetailsValidator.validate(details);

        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.setYear(details.year());
        studyPlan.setDuration(details.duration());
        studyPlan.setTrack(details.track().trim().isEmpty() ? null : details.track());
        studyPlan.setPrivate(details.isPrivate());

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto createStudyPlan(StudyPlanDetailsDto details) {
        StudyPlan studyPlan = new StudyPlan();

        studyPlan.setYear(details.year());
        studyPlan.setDuration(details.duration());
        studyPlan.setTrack(details.track().trim().isEmpty() ? null : details.track());
        studyPlan.setPrivate(details.isPrivate());
        studyPlan.setProgram(AggregateReference.to(details.program()));

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public void deleteStudyPlan(long id) {
        studyPlanRepository.deleteById(id);
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public StudyPlanDto createSection(long studyPlanId, SectionDetailsDto details) {
        var studyPlan = findStudyPlan(studyPlanId);

        Section newSection = new Section();
        newSection.setLevel(details.level());
        newSection.setType(details.type());
        newSection.setRequiredCreditHours(details.requiredCreditHours());
        newSection.setName(details.name().trim().isEmpty() ? null : details.name());

        var sectionSiblings = studyPlan.getSections()
                .stream()
                .filter(s -> s.getLevel() == newSection.getLevel() && s.getType() == newSection.getType())
                .toList();

        if (sectionSiblings.isEmpty()) {
            newSection.setPosition(0);
        } else if (sectionSiblings.size() == 1 && sectionSiblings.getFirst().getPosition() == 0) {
            sectionSiblings.getFirst().setPosition(1);
            newSection.setPosition(2);
        } else {
            newSection.setPosition(sectionSiblings.size() + 1);
        }

        studyPlan.getSections().add(newSection);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto editSectionDetails(long studyPlanId, long sectionId, SectionDetailsDto details) {
        sectionDetailsValidator.validate(details);

        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .ifPresentOrElse(section -> {
                            section.setLevel(details.level());
                            section.setType(details.type());
                            section.setRequiredCreditHours(details.requiredCreditHours());
                            section.setName(details.name().trim().isEmpty() ? null : details.name());
                        }, () -> {
                            throw new SectionNotFoundException("Section was not found");
                        }
                );

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto deleteSection(long studyPlanId, long sectionId) {
        var studyPlan = findStudyPlan(studyPlanId);

        var section = studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Section not found"));

        var sectionSiblings = studyPlan.getSections()
                .stream()
                .filter(s -> s.getLevel() == section.getLevel() && s.getType() == section.getType())
                .toList();

        studyPlan.getSections().stream()
                .filter(s -> s.getLevel() == section.getLevel() &&
                        s.getType() == section.getType() &&
                        s.getPosition() > section.getPosition())
                .forEach(s -> s.setPosition(s.getPosition() - 1));

        if (sectionSiblings.size() == 2) {
            var remainingSection = sectionSiblings.stream()
                    .filter(s -> s.getId() != sectionId)
                    .findFirst()
                    .orElseThrow();
            remainingSection.setPosition(0);
        }

        var sectionCourses = section.getCourses().keySet();

        sectionCourses.forEach(course -> studyPlan.getCoursePlacements().remove(course));

        studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                sectionCourses.contains(coursePrerequisite.getPrerequisite().getId())
        );

        studyPlan.getCourseCorequisites().removeIf(courseCorequisite ->
                sectionCourses.contains(courseCorequisite.getCorequisite().getId())
        );

        studyPlan.getSections().remove(section);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto addCoursesToStudyPlan(
            long studyPlanId,
            long sectionId,
            List<Long> courseIds
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        var section = studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Section was not found"));

        var studyPlanCourses = studyPlan.getSections()
                .stream()
                .flatMap(s -> s.getCourses().keySet().stream())
                .collect(Collectors.toSet());

        Map<Long, SectionCourse> toBeAddedCourses = courseIds
                .stream()
                .filter(courseId -> {
                    if (studyPlanCourses.contains(courseId)) {
                        throw new CourseExistsException("Course was already added in another section");
                    }
                    return true;
                })
                .collect(Collectors.toMap(
                        courseId -> courseId,
                        courseId -> {
                            var addedCourse = new SectionCourse();
                            addedCourse.setCourse(AggregateReference.to(courseId));
                            return addedCourse;
                        }
                ));

        section.getCourses().putAll(toBeAddedCourses);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto removeCoursesFromStudyPlan(long studyPlanId, List<Long> courseIds) {
        var studyPlan = findStudyPlan(studyPlanId);

        for (var courseId : courseIds) {
            studyPlan.getSections().forEach(section -> section.getCourses().remove(courseId));

            studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId)
                            || Objects.equals(coursePrerequisite.getPrerequisite().getId(), courseId)
            );

            studyPlan.getCourseCorequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId)
                            || Objects.equals(coursePrerequisite.getCorequisite().getId(), courseId)
            );

            deleteCoursePlacement(studyPlan, studyPlan.getCoursePlacements().get(courseId));
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    private void insertCoursePlacement(StudyPlan studyPlan, CoursePlacement placement) {
        shiftRows(studyPlan, placement, +1);
        studyPlan.getCoursePlacements().put(placement.getCourse().getId(), placement);
    }

    private void deleteCoursePlacement(StudyPlan studyPlan, CoursePlacement placement) {
        studyPlan.getCoursePlacements().remove(placement.getCourse().getId());
        shiftRows(studyPlan, placement, -1);
    }

    @Transactional
    public StudyPlanDto linkPrerequisitesToCourse(
            long studyPlanId,
            long courseId,
            List<CoursePrerequisiteDto> prerequisites
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlanGraphService.validatePrerequisites(courseId, studyPlan, prerequisites);

        for (var prerequisite : prerequisites) {
            studyPlan.getCoursePrerequisites().add(
                    new CoursePrerequisite(
                            AggregateReference.to(courseId),
                            AggregateReference.to(prerequisite.prerequisite()),
                            Relation.AND
                    )
            );
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto linkCorequisitesToCourse(
            long studyPlanId,
            long courseId,
            List<Long> corequisiteIds
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        for (var corequisiteId : corequisiteIds) {
            studyPlan.getCourseCorequisites().add(
                    new CourseCorequisite(
                            AggregateReference.to(courseId),
                            AggregateReference.to(corequisiteId)
                    )
            );
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto unlinkCorequisitesFromCourse(
            long studyPlanId,
            long courseId,
            long corequisiteId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        boolean removed = studyPlan.getCourseCorequisites().removeIf(courseCorequisite ->
                courseCorequisite.getCourse().getId() == courseId && courseCorequisite.getCorequisite().getId() == corequisiteId
        );

        if (!removed) throw new CourseNotFoundException("Corequisite not found");

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto unlinkPrerequisitesFromCourse(
            long studyPlanId,
            long courseId,
            long prerequisiteId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        boolean removed = studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                coursePrerequisite.getCourse().getId() == courseId
                        && coursePrerequisite.getPrerequisite().getId() == prerequisiteId
        );

        if (!removed) throw new CourseNotFoundException("Prerequisite not found");

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto moveCourseToSection(
            long studyPlanId,
            List<Long> courseIds,
            long targetSectionId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        var targetSection = studyPlan.getSections().stream()
                .filter(section -> section.getId() == targetSectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Target section not found"));

        for (long courseId : courseIds) {
            studyPlan.getSections().forEach(section -> section.getCourses().remove(courseId));

            if (targetSection.getType() == SectionType.Elective || targetSection.getType() == SectionType.Remedial) {
                studyPlan.getCoursePlacements().remove(courseId);
            }

            targetSection.getCourses().put(courseId, new SectionCourse(AggregateReference.to(courseId)));
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto moveSection(
            long studyPlanId,
            long sectionId,
            MoveDirection direction
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        var targetSection = studyPlan.getSections()
                .stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Section not found."));

        var sectionsList = studyPlan.getSections()
                .stream()
                .filter(s -> s.getLevel() == targetSection.getLevel() && s.getType() == targetSection.getType())
                .toList();

        if (sectionsList.size() <= 1) {
            throw new NotEnoughSectionsException("More than one section is required to move section positions.");
        }

        if (targetSection.getPosition() == 1 && direction == MoveDirection.UP) {
            throw new OutOfBoundsPositionException("Section is already at first position.");
        }

        if (targetSection.getPosition() == sectionsList.size() && direction == MoveDirection.DOWN) {
            throw new OutOfBoundsPositionException("Section is already at last position.");
        }

        int currentPosition = targetSection.getPosition();
        int newPosition = direction == MoveDirection.UP ? currentPosition - 1 : currentPosition + 1;

        var swappedSection = sectionsList.stream()
                .filter(s -> s.getPosition() == newPosition)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Cannot move into an unknown section."));

        targetSection.setPosition(newPosition);
        swappedSection.setPosition(currentPosition);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto resizeCoursePlacement(long studyPlanId, long courseId, int span) {
        if (span < 1 || span > 5) {
            throw new InvalidSpanException("A course cannot span less than 1 or larger than 5 courses.");
        }

        var studyPlan = findStudyPlan(studyPlanId);

        var coursePlacement = studyPlan.getCoursePlacements().get(courseId);

        if (coursePlacement == null) {
            throw new CourseNotPlacedException("Course not placed in a term");
        }

        coursePlacement.setSpan(span);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto removeCourseFromSemester(long studyPlanId, long courseId) {
        var studyPlan = findStudyPlan(studyPlanId);

        deleteCoursePlacement(studyPlan, studyPlan.getCoursePlacements().get(courseId));

        return saveAndMapStudyPlan(studyPlan);
    }

    private StudyPlan findStudyPlan(long studyPlanId) {
        return studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan with id " + studyPlanId + " was not found."));
    }

    private StudyPlanDto saveAndMapStudyPlan(StudyPlan studyPlan) {
        StudyPlan savedStudyPlan;

        try {
            savedStudyPlan = studyPlanRepository.save(studyPlan);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException(
                    "This study plan has been modified by another user while you were editing. Please refresh to see the latest version."
            );
        }

        return studyPlanDtoMapper.apply(savedStudyPlan);
    }
}
