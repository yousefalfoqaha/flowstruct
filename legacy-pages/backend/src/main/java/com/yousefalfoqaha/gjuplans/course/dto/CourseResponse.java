package com.yousefalfoqaha.gjuplans.course.dto;

import java.util.Set;

public record CourseResponse(
        long id,
        String code,
        String name,
        int creditHours,
        Set<CoursePrerequisiteResponse> prerequisites,
        CourseSequencesResponse sequences
) {
}
