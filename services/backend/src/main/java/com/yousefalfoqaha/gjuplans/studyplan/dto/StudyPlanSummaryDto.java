package com.yousefalfoqaha.gjuplans.studyplan.dto;

import java.time.Instant;

public record StudyPlanSummaryDto(
        long id,
        int year,
        int duration,
        String track,
        boolean isPublished,
        long program,
        Instant createdAt,
        Instant updatedAt
) {
}
