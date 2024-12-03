package com.yousefalfoqaha.gjuplans.guide.dto.response;

import java.util.Map;

public record GuideResponse(
        Map<Long, GuideCourseResponse> courses
) {
}
