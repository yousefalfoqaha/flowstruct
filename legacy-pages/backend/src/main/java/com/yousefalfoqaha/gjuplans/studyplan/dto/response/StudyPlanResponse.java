package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.guide.dto.response.GuideResponse;

import java.util.List;

public record StudyPlanResponse(
        long id,
        String track,
        int startAcademicYear,
        int duration,
        long program,
        List<SectionResponse> sections,
        GuideResponse guide,
        List<CourseResponse> courses
) {
}
