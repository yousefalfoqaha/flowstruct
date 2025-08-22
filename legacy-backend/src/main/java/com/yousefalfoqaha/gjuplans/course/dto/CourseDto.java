package com.yousefalfoqaha.gjuplans.course.dto;

import com.yousefalfoqaha.gjuplans.course.domain.CourseType;

import java.time.Instant;

public record CourseDto(
        long id,
        String code,
        String name,
        int creditHours,
        int ects,
        int lectureHours,
        int practicalHours,
        CourseType type,
        boolean isRemedial,
        Instant createdAt,
        Instant updatedAt
) {
}
