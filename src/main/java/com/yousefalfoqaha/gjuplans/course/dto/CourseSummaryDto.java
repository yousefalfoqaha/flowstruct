package com.yousefalfoqaha.gjuplans.course.dto;

public record CourseSummaryDto(
        long id,
        String code,
        String name,
        int creditHours,
        String type,
        boolean isRemedial
) {
}
