package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Semester;

public record GuideCourseResponse(
        long course,
        int year,
        Semester semester
) {
}
