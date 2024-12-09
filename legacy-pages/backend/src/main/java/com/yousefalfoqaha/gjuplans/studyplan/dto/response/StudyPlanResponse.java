package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;

import java.util.List;
import java.util.Map;

public record StudyPlanResponse(
        long id,
        int startAcademicYear,
        int duration,
        TrackResponse track,
        long program,
        List<SectionResponse> sections,
        Map<Long, GuideCourseResponse> guideCourses,
        Map<Long, CourseResponse> courses
) {
}
