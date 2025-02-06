package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

public record StudyPlanSummaryResponse(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program
) {
}
