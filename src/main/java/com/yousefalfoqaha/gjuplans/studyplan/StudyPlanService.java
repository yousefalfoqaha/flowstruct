package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import com.yousefalfoqaha.gjuplans.studyplan.domain.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.exception.CourseExistsException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.InvalidCoursePlacement;
import com.yousefalfoqaha.gjuplans.studyplan.exception.SectionNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
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
    private final CourseService courseService;
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

    public void toggleVisibility(long studyPlanId) {
        studyPlanRepository.toggleStudyPlanVisibility(studyPlanId);
    }

    @Transactional
    public StudyPlanResponse addCoursesToSemester(long studyPlanId, AddCoursesToSemesterRequest request) {
        addCoursesToSemesterValidator.validate(request);

        var studyPlan = findStudyPlan(studyPlanId);
        var courses = courseService.getCourses(request.courseIds());

        Map<Long, SectionCourse> courseRequisitesMap = studyPlan.getSections()
                .stream()
                .flatMap(section -> section.getCourses().entrySet().stream())
                .filter(entry -> courses.containsKey(entry.getKey()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));

        for (Map.Entry<Long, CourseResponse> entry : courses.entrySet()) {
            var prerequisites = courseRequisitesMap.get(entry.getKey()).getPrerequisites();

            prerequisites.forEach(prerequisite -> {
                var prerequisitePlacement = studyPlan.getCoursePlacements().get(prerequisite.getPrerequisite().getId());

                if (prerequisitePlacement == null || prerequisitePlacement.getSemester() >= request.semester()) {
                    throw new InvalidCoursePlacement(
                            entry.getValue().name() + " has missing prerequisites or has prerequisites in later semesters."
                    );
                }
            });

            studyPlan.getCoursePlacements().put(
                    entry.getKey(),
                    new CoursePlacement(
                            AggregateReference.to(entry.getKey()),
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

        var studyPlanSummary = findStudyPlanSummaryOrThrow(studyPlanId);

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

        var studyPlanSummary = findStudyPlanSummaryOrThrow(newStudyPlan.getId());

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

        section.getCourses()
                .keySet()
                .forEach(course -> studyPlan.getCoursePlacements().remove(course));

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
    public StudyPlanResponse removeCourseFromSection(long studyPlanId, long courseId) {
        var studyPlan = findStudyPlan(studyPlanId);

        studyPlan.getSections().forEach(section -> {
            section.getCourses().remove(courseId);

            section.getCourses().values().forEach(sectionCourse -> {
                sectionCourse.getPrerequisites().removeIf(
                        prerequisite -> Objects.equals(prerequisite.getPrerequisite().getId(), courseId)
                );

                sectionCourse.getCorequisites().removeIf(
                        corequisite -> Objects.equals(corequisite.getCorequisite().getId(), courseId)
                );
            });
        });

        studyPlan.getCoursePlacements().remove(courseId);

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

        Map<Long, SectionCourse> studyPlanCourses = studyPlan.getSections()
                .stream()
                .flatMap(section -> section.getCourses().entrySet().stream())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));

        Set<Long> visited = new HashSet<>();

        var parentCourse = studyPlanCourses.get(courseId);

        for (var prerequisite : prerequisiteRequests) {
            if (!visited.contains(prerequisite.prerequisite())) {
                detectCycle(courseId, prerequisite.prerequisite(), visited, studyPlanCourses);
            }

            parentCourse.getPrerequisites().add(
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
    public StudyPlanResponse removeCoursePrerequisite(
            long studyPlanId,
            long courseId,
            long prerequisiteId
    ) {
        var studyPlan = findStudyPlan(studyPlanId);

        var section = studyPlan.getSections()
                .stream()
                .filter(s -> s.getCourses().containsKey(courseId))
                .findFirst()
                .orElseThrow(() -> new CourseNotFoundException("Course not found in any section"));

        var sectionCourse = section.getCourses().get(courseId);

        boolean removed = sectionCourse.getPrerequisites()
                .removeIf(prerequisite -> prerequisite.getPrerequisite().getId() == prerequisiteId);

        if (!removed) throw new CourseNotFoundException("Prerequisite not found");

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
    }

    private void detectCycle(
            long originalCourseId,
            long prerequisiteId,
            Set<Long> visited,
            Map<Long, SectionCourse> studyPlanCourses
    ) {
        if (visited.contains(prerequisiteId)) return;

        if (originalCourseId == prerequisiteId) throw new RuntimeException("Cycle detected.");

        for (var prerequisite : studyPlanCourses.get(prerequisiteId).getPrerequisites()) {
            if (!visited.contains(prerequisite.getPrerequisite().getId())) {
                detectCycle(originalCourseId, prerequisite.getPrerequisite().getId(), visited, studyPlanCourses);
            }
        }

        visited.add(prerequisiteId);
    }

    private StudyPlan findStudyPlan(long studyPlanId) {
        return studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan with id " + studyPlanId + " was not found."));
    }

    private StudyPlanSummaryProjection findStudyPlanSummaryOrThrow(long studyPlanId) {
        return studyPlanRepository.findStudyPlanSummary(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan was not found."));
    }
}

