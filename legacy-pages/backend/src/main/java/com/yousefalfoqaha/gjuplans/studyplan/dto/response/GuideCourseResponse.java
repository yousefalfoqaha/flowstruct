package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Semester;

public record GuideCourseResponse(
        int year,
        Semester semester
) {
}
