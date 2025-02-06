package com.yousefalfoqaha.gjuplans.studyplan.projection;

public record StudyPlanSummaryProjection(
        Long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        Long program
) {
}

