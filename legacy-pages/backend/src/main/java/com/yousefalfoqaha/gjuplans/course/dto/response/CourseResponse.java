package com.yousefalfoqaha.gjuplans.course.dto.response;

import java.util.Map;

public record CourseResponse(
        long id,
        String code,
        String name,
        int creditHours,
        Map<Long, CoursePrerequisiteResponse> prerequisites
) {
}
