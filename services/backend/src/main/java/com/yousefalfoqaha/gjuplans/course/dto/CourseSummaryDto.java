package com.yousefalfoqaha.gjuplans.course.dto;

import java.time.Instant;

public record CourseSummaryDto(
        long id,
        String code,
        String name,
        int creditHours,
        String type,
        boolean isRemedial,
        boolean isArchived,
        Instant createdAt,
        Instant updatedAt,
        Long updatedBy
) {
}
