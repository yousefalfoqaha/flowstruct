package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.course.CourseService;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSummaryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyPlanCourseService {
    private final StudyPlanService studyPlanService;
    private final CourseService courseService;

    public Map<Long, CourseSummaryDto> getStudyPlanCourseList(long studyPlanId) {
        var studyPlan = studyPlanService.getStudyPlan(studyPlanId);

        var courseIds = studyPlan.sections()
                .stream()
                .flatMap(s -> s.courses().stream())
                .toList();

        return courseService.getCourseList(courseIds);
    }

    public Map<Long, CourseDto> getStudyPlanDetailedCourseList(long studyPlanId) {
        var studyPlan = studyPlanService.getStudyPlan(studyPlanId);

        var courseIds = studyPlan.sections()
                .stream()
                .flatMap(s -> s.courses().stream())
                .toList();

        return courseService.getDetailedCourseList(courseIds);
    }
}
