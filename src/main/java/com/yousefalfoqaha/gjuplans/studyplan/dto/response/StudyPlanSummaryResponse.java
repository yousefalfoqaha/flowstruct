package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

public record StudyPlanSummaryResponse(
        long id,
        int year,
        String track,
        boolean isPrivate,
        long program
) {
}
