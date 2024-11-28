package com.yousefalfoqaha.gjuplans.course;

import java.util.List;

public record CourseResponse(
        long id,
        String code,
        String name,
        int creditHours,
        List<CoursePrerequisiteResponse> prerequisites
) {
}
