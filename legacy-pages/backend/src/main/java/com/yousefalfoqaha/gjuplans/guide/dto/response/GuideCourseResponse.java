package com.yousefalfoqaha.gjuplans.guide.dto.response;

import com.yousefalfoqaha.gjuplans.guide.domain.Semester;

public record GuideCourseResponse(
        int year,
        Semester semester
) {
}
