package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.CourseService;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.*;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final CourseService courseService;

    public List<StudyPlanOptionResponse> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlans();
    }

    public StudyPlanResponse getStudyPlan(long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

        return new StudyPlanResponse(
                studyPlan.getId(),
                studyPlan.getStartAcademicYear(),
                studyPlan.getDuration(),
                new TrackResponse(
                        studyPlan.getTrack().getCode(),
                        studyPlan.getTrack().getName()
                ),
                studyPlan.getProgram().getId(),
                studyPlan.getSections()
                        .stream()
                        .map(sec -> new SectionResponse(
                                sec.getId(),
                                sec.getLevel(),
                                sec.getType(),
                                sec.getName(),
                                sec.getCourses()
                                        .stream()
                                        .map(c -> c.getCourse().getId())
                                        .toList()
                        ))
                        .toList(),
                studyPlan.getGuideCourses()
                        .entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                entry -> new GuideCourseResponse(
                                        entry.getValue().getYear(),
                                        entry.getValue().getSemester()
                                )
                        )),
                courseService.getCoursesById(
                        studyPlan.getSections()
                                .stream()
                                .flatMap(sec -> sec.getCourses().stream())
                                .map(c -> c.getCourse().getId())
                                .distinct()
                                .toList()
                )
        );
    }
}
