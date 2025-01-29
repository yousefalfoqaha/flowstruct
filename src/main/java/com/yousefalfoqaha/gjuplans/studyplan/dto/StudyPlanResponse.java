package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseWithSequencesResponse;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramResponse;

import java.util.List;
import java.util.Map;

public record StudyPlanResponse(
        long id,
        int year,
        String track,
        ProgramResponse program,
        List<SectionResponse> sections,
        Map<Long, Integer> coursePlacements,
        Map<Long, CourseWithSequencesResponse> courses,
        List<StudyPlanOptionResponse> otherStudyPlans
) {
}
