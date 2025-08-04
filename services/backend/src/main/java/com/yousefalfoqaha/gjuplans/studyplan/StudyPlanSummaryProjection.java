package com.yousefalfoqaha.gjuplans.studyplan;

import java.time.Instant;

public record StudyPlanSummaryProjection(
        long id,
        int year,
        int duration,
        String track,
        boolean isPending,
        Long version,
        Long approvedVersion,
        int program,
        Instant createdAt,
        Instant updatedAt,
        Long updatedBy
) {
}
