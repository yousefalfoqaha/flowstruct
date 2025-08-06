package com.yousefalfoqaha.gjuplans.studyplan.projection;

import java.time.Instant;

public record StudyPlanSummaryProjection(
        long id,
        int year,
        int duration,
        String track,
        Long version,
        Long approvedVersion,
        int program,
        Instant createdAt,
        Instant updatedAt,
        Long updatedBy
) {
}
