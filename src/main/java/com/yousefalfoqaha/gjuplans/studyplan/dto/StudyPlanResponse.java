package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseWithSequencesResponse;

import java.util.List;
import java.util.Map;

public record StudyPlanResponse(
        long id,
        int year,
        String track,
        long program,
        List<SectionResponse> sections,
        Map<Long, Integer> coursePlacements,
        Map<Long, CourseWithSequencesResponse> courses
) {
}
