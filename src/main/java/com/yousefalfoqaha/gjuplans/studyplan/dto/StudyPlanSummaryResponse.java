package com.yousefalfoqaha.gjuplans.studyplan.dto;

public record StudyPlanSummaryResponse(
        long id,
        int year,
        String track,
        boolean isCommitted,
        long program
) {
}
