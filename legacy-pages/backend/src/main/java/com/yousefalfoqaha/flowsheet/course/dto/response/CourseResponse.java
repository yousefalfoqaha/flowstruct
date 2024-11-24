package com.yousefalfoqaha.flowsheet.course.dto.response;

import java.util.List;

public record CourseResponse(
        long id,
        String name,
        int creditHours,
        List<Long> prerequisites
) {
}
