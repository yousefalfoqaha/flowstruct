package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import com.yousefalfoqaha.gjuplans.studyplan.domain.CoursePlacement;
import com.yousefalfoqaha.gjuplans.studyplan.domain.Section;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionCourse;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
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

import java.util.List;
import java.util.Map;
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

        for (Map.Entry<Long, CourseResponse> entry : courses.entrySet()) {
            entry.getValue().prerequisites().forEach(prerequisite -> {
                var prerequisitePlacement = studyPlan.getCoursePlacements().get(prerequisite.prerequisite());

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
        studyPlan.getSections().removeIf(s -> s.getId() == sectionId);

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

        var existingCourses = studyPlan.getSections()
                .stream()
                .flatMap(s -> s.getCourses().stream().map(sc -> sc.getCourse().getId()))
                .collect(Collectors.toSet());

        List<SectionCourse> toBeAddedCourses = request.courseIds()
                .stream()
                .map(courseId -> {
                    if (existingCourses.contains(courseId)) {
                        throw new CourseExistsException("Course was already added in another section");
                    }
                    return new SectionCourse(AggregateReference.to(courseId));
                })
                .toList();

        section.getCourses().addAll(toBeAddedCourses);

        var updatedStudyPlan = studyPlanRepository.save(studyPlan);
        return studyPlanResponseMapper.apply(updatedStudyPlan);
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

