package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.common.AlreadyApprovedException;
import com.yousefalfoqaha.gjuplans.common.EmptyListException;
import com.yousefalfoqaha.gjuplans.common.InvalidDetailsException;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanDtoMapper;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanSummaryDtoMapper;
import com.yousefalfoqaha.gjuplans.studyplan.domain.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.*;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanGraphService studyPlanGraphService;
    private final StudyPlanDtoMapper studyPlanDtoMapper;
    private final StudyPlanSummaryDtoMapper studyPlanSummaryDtoMapper;

    public StudyPlanDto getStudyPlan(long studyPlanId) {
        var studyPlan = findStudyPlan(studyPlanId);
        return studyPlanDtoMapper.apply(studyPlan);
    }

    public List<StudyPlanSummaryDto> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlanSummaries()
                .stream()
                .map(studyPlanSummaryDtoMapper)
                .toList();
    }

    @Transactional
    public StudyPlanDto approveStudyPlan(long studyPlanId) {
        var studyPlan = findStudyPlan(studyPlanId);
        StudyPlanDraft lastApprovedStudyPlan = studyPlan.getApprovedStudyPlan();

        if (lastApprovedStudyPlan != null && Objects.equals(lastApprovedStudyPlan.getVersion(), studyPlan.getVersion())) {
            throw new AlreadyApprovedException("This version has already been approved.");
        }

        studyPlan.setApprovedStudyPlan(new StudyPlanDraft(studyPlan));
        studyPlan.getApprovedStudyPlan().setVersion(studyPlan.getVersion() + 1);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto cloneStudyPlan(long studyPlanToCloneId, StudyPlanDetailsDto cloneDetails) {
        var studyPlanToClone = findStudyPlan(studyPlanToCloneId);

        if (!Objects.equals(studyPlanToClone.getProgram().getId(), cloneDetails.program())) {
            throw new InvalidDetailsException("Cloned study plan must come from the same program.");
        }

        studyPlanToClone.getCoursePlacements()
                .entrySet()
                .removeIf(entry -> entry.getValue().getYear() > cloneDetails.duration());

        Set<Section> sectionClones = studyPlanToClone.getSections().stream()
                .map(section -> {
                    section.setId(null);
                    return section;
                })
                .collect(Collectors.toSet());

        StudyPlan studyPlanClone = new StudyPlan(
                null,
                cloneDetails.year(),
                cloneDetails.duration(),
                cloneDetails.track(),
                false,
                studyPlanToClone.getProgram(),
                null,
                null,
                null,
                null,
                null,
                sectionClones,
                studyPlanToClone.getCoursePlacements(),
                studyPlanToClone.getCoursePrerequisites(),
                studyPlanToClone.getCourseCorequisites()
        );

        return saveAndMapStudyPlan(studyPlanClone);
    }

    @Transactional
    public StudyPlanDto moveCourseToSemester(
            long studyPlanId,
            long courseId,
            PlacementDto targetPlacement
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        if (targetPlacement.year() > studyPlan.getDuration()) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        var oldPlacement = studyPlan.getCoursePlacements().get(courseId);
        var newPlacement = new Placement(
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

        deleteCoursePlacement(studyPlan, courseId, oldPlacement);
        insertCoursePlacement(studyPlan, courseId, newPlacement);

        return saveAndMapStudyPlan(studyPlan);
    }

    private int comparePlacement(Placement p1, Placement p2) {
        if (p1.getYear() != p2.getYear()) {
            return Integer.compare(p1.getYear(), p2.getYear());
        }
        return Integer.compare(p1.getSemester(), p2.getSemester());
    }

    private void shiftPositions(StudyPlan studyPlan, Placement placement, int delta) {
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
    public StudyPlanDto placeCoursesInSemester(long studyPlanId, List<Long> courseIds, PlacementDto targetPlacement) {
        var studyPlan = findStudyPlan(studyPlanId);

        var coursePrerequisitesMap = studyPlan.getCoursePrerequisitesMap();

        if (targetPlacement.year() > studyPlan.getDuration()) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        int lastPosition = studyPlan.getCoursePlacements().values()
                .stream()
                .filter(currentPlacement ->
                        comparePlacement(
                                new Placement(
                                        targetPlacement.year(),
                                        targetPlacement.semester(),
                                        1,
                                        1
                                ),
                                currentPlacement
                        ) == 0
                )
                .mapToInt(Placement::getPosition)
                .max()
                .orElse(0);

        for (var courseId : courseIds) {
            if (studyPlan.getCoursePlacements().containsKey(courseId)) {
                throw new CourseAlreadyAddedException("A course already exists in the program map.");
            }

            var individualCoursePlacement = new Placement(
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
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.setYear(details.year());
        studyPlan.setDuration(details.duration());
        studyPlan.setTrack(details.track().trim());

        studyPlan.getCoursePlacements()
                .entrySet()
                .removeIf(entry -> entry.getValue().getYear() > studyPlan.getDuration());

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto createStudyPlan(StudyPlanDetailsDto details) {
        StudyPlan studyPlan = new StudyPlan(
                null,
                details.year(),
                details.duration(),
                details.track().trim(),
                false,
                AggregateReference.to(details.program()),
                null,
                null,
                null,
                null,
                null,
                new HashSet<>(),
                new HashMap<>(),
                new HashSet<>(),
                new HashSet<>()
        );

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
        newSection.setName(details.name().trim());

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
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .ifPresentOrElse(section -> {
                            section.setLevel(details.level());
                            section.setType(details.type());
                            section.setRequiredCreditHours(details.requiredCreditHours());
                            section.setName(details.name().trim());
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

        section.getCourses().forEach(sectionCourse -> studyPlan.getCoursePlacements().remove(sectionCourse.getCourse().getId()));

        studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                section.hasCourse(coursePrerequisite.getPrerequisite().getId())
        );

        studyPlan.getCourseCorequisites().removeIf(courseCorequisite ->
                section.hasCourse(courseCorequisite.getCorequisite().getId())
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
        if (courseIds.isEmpty()) {
            throw new EmptyListException("No courses were found to add");
        }

        var studyPlan = findStudyPlan(studyPlanId);

        var section = studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Section was not found"));

        Set<SectionCourse> toBeAddedCourses = courseIds
                .stream()
                .filter(courseId -> {
                    boolean alreadyAdded = studyPlan.getSections().stream()
                            .anyMatch(s -> s.hasCourse(courseId));
                    if (alreadyAdded) {
                        throw new CourseExistsException("Course was already added in another section");
                    }
                    return true;
                })
                .map(courseId -> new SectionCourse(AggregateReference.to(courseId)))
                .collect(Collectors.toSet());

        section.getCourses().addAll(toBeAddedCourses);

        return saveAndMapStudyPlan(studyPlan);
    }

    @Transactional
    public StudyPlanDto removeCoursesFromStudyPlan(long studyPlanId, List<Long> courseIds) {
        var studyPlan = findStudyPlan(studyPlanId);

        for (var courseId : courseIds) {
            studyPlan.getSections().forEach(section -> section.removeCourse(courseId));

            studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId)
                            || Objects.equals(coursePrerequisite.getPrerequisite().getId(), courseId)
            );

            studyPlan.getCourseCorequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId)
                            || Objects.equals(coursePrerequisite.getCorequisite().getId(), courseId)
            );

            deleteCoursePlacement(studyPlan, courseId, studyPlan.getCoursePlacements().get(courseId));
        }

        return saveAndMapStudyPlan(studyPlan);
    }

    private void insertCoursePlacement(StudyPlan studyPlan, long courseId, Placement placement) {
        if (placement == null) return;
        shiftPositions(studyPlan, placement, +1);
        studyPlan.getCoursePlacements().put(courseId, placement);
    }

    private void deleteCoursePlacement(StudyPlan studyPlan, long courseId, Placement placement) {
        if (placement == null) return;
        studyPlan.getCoursePlacements().remove(courseId);
        shiftPositions(studyPlan, placement, -1);
    }

    @Transactional
    public StudyPlanDto linkPrerequisitesToCourse(
            long studyPlanId,
            long courseId,
            List<Long> prerequisites,
            Relation relation
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlanGraphService.validatePrerequisites(courseId, studyPlan, prerequisites);

        for (var prerequisite : prerequisites) {
            studyPlan.getCoursePrerequisites().add(
                    new CoursePrerequisite(
                            AggregateReference.to(courseId),
                            AggregateReference.to(prerequisite),
                            relation
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
            studyPlan.getSections().forEach(section -> section.removeCourse(courseId));

            if (targetSection.getType() == SectionType.Elective || targetSection.getType() == SectionType.Remedial) {
                studyPlan.getCoursePlacements().remove(courseId);
            }

            targetSection.addCourse(courseId);
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

        deleteCoursePlacement(studyPlan, courseId, studyPlan.getCoursePlacements().get(courseId));

        return saveAndMapStudyPlan(studyPlan);
    }

    private StudyPlan findStudyPlan(long studyPlanId) {
        return studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan with id " + studyPlanId + " was not found."));
    }

    private StudyPlanDto saveAndMapStudyPlan(StudyPlan studyPlan) {
        try {
            StudyPlan savedStudyPlan = studyPlanRepository.save(studyPlan);
            return studyPlanDtoMapper.apply(savedStudyPlan);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException(
                    "This study plan has been modified by another user while you were editing. Please refresh to see the latest version."
            );
        }
    }
}
