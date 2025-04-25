package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseSummaryResponse;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyPlanCourseService {
    private final StudyPlanService studyPlanService;
    private final CourseService courseService;

    public Map<Long, CourseSummaryResponse> getStudyPlanCourses(long studyPlanId) {
        var studyPlan = studyPlanService.getStudyPlan(studyPlanId);

        var courseIds = studyPlan.sections()
                .stream()
                .flatMap(s -> s.courses().stream())
                .toList();

        return courseService.getCoursesById(courseIds);
    }
}
