package com.yousefalfoqaha.gjuplans.course.dto;

import com.yousefalfoqaha.gjuplans.course.domain.CourseType;

import java.util.Set;

public record CourseResponse(
        long id,
        String code,
        String name,
        int creditHours,
        int ects,
        int lectureHours,
        int practicalHours,
        CourseType type,
        Set<CoursePrerequisiteResponse> prerequisites,
        Set<Long> corequisites,
        CourseSequencesResponse sequences
) {
}
