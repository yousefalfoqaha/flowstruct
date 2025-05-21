package com.yousefalfoqaha.gjuplans.studyplan.dto;

import java.util.List;

public record SemesterCoursesDto(
        List<Long> courseIds,
        int year,
        int semester
) {
}
