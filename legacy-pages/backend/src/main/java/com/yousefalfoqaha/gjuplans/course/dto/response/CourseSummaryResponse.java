package com.yousefalfoqaha.gjuplans.course.dto.response;

public record CourseSummaryResponse(
        long id,
        String code,
        String name,
        int creditHours
) {
}
