package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.course.CourseService;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyPlanCourseService {
    private final StudyPlanService studyPlanService;
    private final CourseService courseService;

    public Map<Long, CourseSummaryResponse> getStudyPlanCourseList(long studyPlanId) {
        var studyPlan = studyPlanService.getStudyPlan(studyPlanId);

        var courseIds = studyPlan.sections()
                .stream()
                .flatMap(s -> s.courses().stream())
                .toList();

        return courseService.getCoursesById(courseIds);
    }

    public Map<Long, CourseResponse> getStudyPlanDetailedCourseList(long studyPlanId) {
        var studyPlan = studyPlanService.getStudyPlan(studyPlanId);

        var courseIds = studyPlan.sections()
                .stream()
                .flatMap(s -> s.courses().stream())
                .toList();

        return courseService.getDetailedCoursesById(courseIds);
    }
}
