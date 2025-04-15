package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.domain.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import com.yousefalfoqaha.gjuplans.studyplan.mapper.StudyPlanResponseMapper;
import com.yousefalfoqaha.gjuplans.studyplan.mapper.StudyPlanSummaryResponseMapper;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanSummaryProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final ObjectValidator<EditStudyPlanDetailsRequest> editStudyPlanDetailsValidator;
    private final ObjectValidator<AddCoursesToSemesterRequest> addCoursesToSemesterValidator;
    private final ObjectValidator<EditSectionRequest> editSectionRequestValidator;
    private final StudyPlanResponseMapper studyPlanResponseMapper;
    private final StudyPlanSummaryResponseMapper studyPlanSummaryResponseMapper;
    private final ObjectValidator<AddCoursesToSectionRequest> addCoursesToSectionValidator;

    public List<StudyPlanSummaryResponse> getProgramStudyPlans(long programId) {
        return studyPlanRepository.findAllStudyPlanSummariesByProgram(programId)
                .stream()
                .map(studyPlanSummaryResponseMapper)
                .toList();
    }

    public StudyPlanResponse getStudyPlan(long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

        return studyPlanResponseMapper.apply(studyPlan);
    }

    public List<StudyPlanSummaryResponse> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlanSummaries().stream()
                .map(studyPlanSummaryResponseMapper)
                .toList();
    }

    public StudyPlanResponse toggleVisibility(long studyPlanId) {
        studyPlanRepository.toggleStudyPlanVisibility(studyPlanId);

        var updatedStudyPlan = findStudyPlan(studyPlanId);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse addCoursesToSemester(long studyPlanId, AddCoursesToSemesterRequest request) {
        addCoursesToSemesterValidator.validate(request);

        var studyPlan = findStudyPlan(studyPlanId);
        var coursePrerequisitesMap = studyPlan.getCoursePrerequisitesMap();

        for (var courseId : request.courseIds()) {
            if (studyPlan.getCoursePlacements().containsKey(courseId)) {
                throw new CourseAlreadyAddedException("A course already exists in the program map.");
            }

            var prerequisites = coursePrerequisitesMap.get(courseId);

            if (prerequisites != null) {
                prerequisites.forEach(prerequisite -> {

                    var prerequisitePlacement = studyPlan.getCoursePlacements().get(prerequisite.getPrerequisite().getId());

                    if (prerequisitePlacement == null || prerequisitePlacement.getSemester() >= request.semester()) {
                        throw new InvalidCoursePlacement("A course has missing prerequisites or has prerequisites in later semesters.");
                    }
                });
            }

            studyPlan.getCoursePlacements().put(
                    courseId,
                    new CoursePlacement(
                            AggregateReference.to(courseId),
                            request.semester()
                    )
            );
        }

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanSummaryResponse editStudyPlanDetails(long studyPlanId, EditStudyPlanDetailsRequest request) {
        editStudyPlanDetailsValidator.validate(request);

        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.setYear(request.year());
        studyPlan.setDuration(request.duration());
        studyPlan.setTrack(request.track());

        studyPlanRepository.save(studyPlan);

        var studyPlanSummary = findStudyPlanSummary(studyPlanId);
        return studyPlanSummaryResponseMapper.apply(studyPlanSummary);
    }

    @Transactional
    public StudyPlanSummaryResponse createStudyPlan(CreateStudyPlanRequest request) {
        StudyPlan studyPlan = new StudyPlan();

        studyPlan.setYear(request.year());
        studyPlan.setDuration(request.duration());
        studyPlan.setTrack(request.track());
        studyPlan.setPrivate(true);
        studyPlan.setProgram(AggregateReference.to(request.program()));

        var newStudyPlan = studyPlanRepository.save(studyPlan);

        var studyPlanSummary = findStudyPlanSummary(newStudyPlan.getId());
        return studyPlanSummaryResponseMapper.apply(studyPlanSummary);
    }

    @Transactional
    public void deleteStudyPlan(long studyPlanId) {
        studyPlanRepository.deleteById(studyPlanId);
    }

    @Transactional
    public StudyPlanResponse createSection(long studyPlanId, CreateSectionRequest request) {
        var studyPlan = findStudyPlan(studyPlanId);

        Section newSection = new Section();
        newSection.setLevel(request.level());
        newSection.setType(request.type());
        newSection.setRequiredCreditHours(request.requiredCreditHours());
        newSection.setName(request.name());

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

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse editSection(long studyPlanId, long sectionId, EditSectionRequest request) {
        editSectionRequestValidator.validate(request);

        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .ifPresentOrElse(section -> {
                            section.setLevel(request.level());
                            section.setType(request.type());
                            section.setRequiredCreditHours(request.requiredCreditHours());
                            section.setName(request.name());
                        }, () -> {
                            throw new SectionNotFoundException("Section was not found");
                        }
                );

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse deleteSection(long studyPlanId, long sectionId) {
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

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse addCoursesToSection(
            long studyPlanId,
            long sectionId,
            AddCoursesToSectionRequest request
    ) {
        addCoursesToSectionValidator.validate(request);

        var studyPlan = findStudyPlan(studyPlanId);

        var section = studyPlan.getSections().stream()
                .filter(s -> s.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Section was not found"));

        var studyPlanCourses = studyPlan.getSections()
                .stream()
                .flatMap(s -> s.getCourses().keySet().stream())
                .collect(Collectors.toSet());

        Map<Long, SectionCourse> toBeAddedCourses = request.courseIds()
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

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse removeCourseFromSection(long studyPlanId, List<Long> courseIds) {
        var studyPlan = findStudyPlan(studyPlanId);

        for (var courseId : courseIds) {
            studyPlan.getSections().forEach(section -> section.getCourses().remove(courseId));

            studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId) || Objects.equals(coursePrerequisite.getPrerequisite().getId(), courseId)
            );

            studyPlan.getCourseCorequisites().removeIf(coursePrerequisite ->
                    Objects.equals(coursePrerequisite.getCourse().getId(), courseId) || Objects.equals(coursePrerequisite.getCorequisite().getId(), courseId)
            );

            studyPlan.getCoursePlacements().remove(courseId);
        }

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse assignCoursePrerequisites(
            long studyPlanId,
            long courseId,
            List<CoursePrerequisiteRequest> prerequisiteRequests
    ) {
        var studyPlan = findStudyPlan(studyPlanId);
        var coursePrerequisitesMap = studyPlan.getCoursePrerequisitesMap();

        Set<Long> visited = new HashSet<>();

        for (var prerequisite : prerequisiteRequests) {
            if (!visited.contains(prerequisite.prerequisite())) {
                detectCycle(courseId, prerequisite.prerequisite(), visited, coursePrerequisitesMap);
            }

            studyPlan.getCoursePrerequisites().add(
                    new CoursePrerequisite(
                            AggregateReference.to(courseId),
                            AggregateReference.to(prerequisite.prerequisite()),
                            Relation.AND
                    )
            );
        }

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse assignCourseCorequisites(
            long studyPlanId,
            long courseId,
            List<Long> corequisites
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        for (var corequisite : corequisites) {
            studyPlan.getCourseCorequisites().add(
                    new CourseCorequisite(
                            AggregateReference.to(courseId),
                            AggregateReference.to(corequisite)
                    )
            );
        }

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse removeCourseCorequisite(
            long studyPlanId,
            long courseId,
            long corequisiteId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        boolean removed = studyPlan.getCourseCorequisites().removeIf(courseCorequisite ->
                courseCorequisite.getCourse().getId() == courseId && courseCorequisite.getCorequisite().getId() == corequisiteId
        );

        if (!removed) throw new CourseNotFoundException("Corequisite not found");

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse removeCoursePrerequisite(
            long studyPlanId,
            long courseId,
            long prerequisiteId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        boolean removed = studyPlan.getCoursePrerequisites().removeIf(coursePrerequisite ->
                coursePrerequisite.getCourse().getId() == courseId && coursePrerequisite.getPrerequisite().getId() == prerequisiteId
        );

        if (!removed) throw new CourseNotFoundException("Prerequisite not found");

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse moveCourseSection(
            long studyPlanId,
            long courseId,
            long sectionId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getSections().forEach(section -> section.getCourses().remove(courseId));

        var targetSection = studyPlan.getSections().stream()
                .filter(section -> section.getId() == sectionId)
                .findFirst()
                .orElseThrow(() -> new SectionNotFoundException("Target section not found"));

        if (targetSection.getType() == SectionType.Elective || targetSection.getType() == SectionType.Remedial) {
            studyPlan.getCoursePlacements().remove(courseId);
        }

        targetSection.getCourses().put(courseId, new SectionCourse(AggregateReference.to(courseId)));

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    @Transactional
    public StudyPlanResponse moveSectionPosition(
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

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    public StudyPlanResponse removeCoursePlacement(long studyPlanId, long courseId) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getCoursePlacements().remove(courseId);

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    private void detectCycle(
            long originalCourseId,
            long prerequisiteId,
            Set<Long> visited,
            Map<Long, List<CoursePrerequisite>> coursePrerequisitesMap
    ) {
        if (visited.contains(prerequisiteId)) return;

        if (originalCourseId == prerequisiteId) throw new RuntimeException("Cycle detected.");

        var prerequisites = coursePrerequisitesMap.get(prerequisiteId);

        if (prerequisites == null) return;

        for (var prerequisite : prerequisites) {
            if (!visited.contains(prerequisite.getPrerequisite().getId())) {
                detectCycle(originalCourseId, prerequisite.getPrerequisite().getId(), visited, coursePrerequisitesMap);
            }
        }

        visited.add(prerequisiteId);
    }

    private StudyPlan findStudyPlan(long studyPlanId) {
        return studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan with id " + studyPlanId + " was not found."));
    }

    private StudyPlanSummaryProjection findStudyPlanSummary(long studyPlanId) {
        return studyPlanRepository.findStudyPlanSummary(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan was not found."));
    }
}
