package com.yousefalfoqaha.gjuplans.studyplan.projection;

public record StudyPlanSummaryProjection(
        Long id,
        Integer year,
        String track,
        boolean isPrivate,
        Long program
) {
}

