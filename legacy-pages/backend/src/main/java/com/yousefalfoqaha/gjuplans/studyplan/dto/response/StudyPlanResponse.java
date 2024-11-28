package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;

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
