package com.yousefalfoqaha.gjuplans.course.projection;

public record CourseSummaryProjection(
        long id,
        String code,
        String name,
        int creditHours
) {
}
