package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import com.yousefalfoqaha.gjuplans.studyplan.domain.CoursePlacement;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.AddCoursesToSemesterRequest;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.CreateStudyPlanRequest;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.UpdateStudyPlanRequest;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.SectionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.exception.InvalidCoursePlacement;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
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
    private final ObjectValidator<UpdateStudyPlanRequest> updateStudyPlanValidator;
    private final ObjectValidator<AddCoursesToSemesterRequest> addCoursesToSemesterValidator;

    public List<StudyPlanSummaryResponse> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlans()
                .stream()
                .map(sp -> new StudyPlanSummaryResponse(
                        sp.id(),
                        sp.year(),
                        sp.duration(),
                        sp.track(),
                        sp.isPrivate(),
                        sp.program()
                ))
                .toList();
    }

    public List<StudyPlanSummaryResponse> getProgramStudyPlans(long programId) {
        return studyPlanRepository.findAllStudyPlansByProgram(programId)
                .stream()
                .map(sp -> new StudyPlanSummaryResponse(
                        sp.id(),
                        sp.year(),
                        sp.duration(),
                        sp.track(),
                        sp.isPrivate(),
                        sp.program()
                ))
                .toList();
    }

    public StudyPlanResponse getStudyPlan(long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

        return new StudyPlanResponse(
                studyPlan.getId(),
                studyPlan.getYear(),
                studyPlan.getDuration(),
                studyPlan.getTrack(),
                studyPlan.isPrivate(),
                studyPlan.getProgram().getId(),
                studyPlan.getSections()
                        .stream()
                        .map(sec -> new SectionResponse(
                                sec.getId(),
                                sec.getLevel(),
                                sec.getType(),
                                sec.getRequiredCreditHours(),
                                sec.getName(),
                                sec.getCourses()
                                        .stream()
                                        .map(c -> c.getCourse().getId())
                                        .toList()
                        ))
                        .toList(),
                studyPlan.getCoursePlacements().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                entry -> entry.getKey(),
                                entry -> entry.getValue().getSemester()
                        )),
                courseService.getCourses(
                        studyPlan.getSections()
                                .stream()
                                .flatMap(sec -> sec.getCourses().stream())
                                .map(c -> c.getCourse().getId())
                                .distinct()
                                .toList()
                )
        );
    }

    public void toggleVisibility(long studyPlanId) {
        studyPlanRepository.toggleStudyPlanVisibility(studyPlanId);
    }

    @Transactional
    public StudyPlanResponse addCoursesToSemester(long studyPlanId, AddCoursesToSemesterRequest request) {
        addCoursesToSemesterValidator.validate(request);

        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

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

        return new StudyPlanResponse(
                updatedStudyPlan.getId(),
                updatedStudyPlan.getYear(),
                updatedStudyPlan.getDuration(),
                updatedStudyPlan.getTrack(),
                updatedStudyPlan.isPrivate(),
                updatedStudyPlan.getProgram().getId(),
                updatedStudyPlan.getSections()
                        .stream()
                        .map(sec -> new SectionResponse(
                                sec.getId(),
                                sec.getLevel(),
                                sec.getType(),
                                sec.getRequiredCreditHours(),
                                sec.getName(),
                                sec.getCourses()
                                        .stream()
                                        .map(c -> c.getCourse().getId())
                                        .toList()
                        ))
                        .toList(),
                updatedStudyPlan.getCoursePlacements().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                entry -> entry.getKey(),
                                entry -> entry.getValue().getSemester()
                        )),
                courseService.getCourses(
                        updatedStudyPlan.getSections()
                                .stream()
                                .flatMap(sec -> sec.getCourses().stream())
                                .map(c -> c.getCourse().getId())
                                .distinct()
                                .toList()
                )
        );
    }


    @Transactional
    public StudyPlanSummaryResponse updateStudyPlan(long studyPlanId, UpdateStudyPlanRequest request) {
        updateStudyPlanValidator.validate(request);

        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan was not found."));

        studyPlan.setYear(request.year());
        studyPlan.setDuration(request.duration());
        studyPlan.setTrack(request.track());

        studyPlanRepository.save(studyPlan);

        return new StudyPlanSummaryResponse(
                studyPlan.getId(),
                studyPlan.getYear(),
                studyPlan.getDuration(),
                studyPlan.getTrack(),
                studyPlan.isPrivate(),
                studyPlan.getProgram().getId()
        );
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

        return new StudyPlanSummaryResponse(
                newStudyPlan.getId(),
                newStudyPlan.getYear(),
                newStudyPlan.getDuration(),
                newStudyPlan.getTrack(),
                newStudyPlan.isPrivate(),
                newStudyPlan.getProgram().getId()
        );
    }

    @Transactional
    public void deleteStudyPlan(long studyPlanId) {
        studyPlanRepository.deleteById(studyPlanId);
    }
}

