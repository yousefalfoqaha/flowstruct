package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.CourseResponse;

import java.util.List;

public record StudyPlanResponse(
        long id,
        String track,
        int startAcademicYear,
        int duration,
        long program,
        List<SectionResponse> sections,
        List<CourseResponse> courses
) {
}
