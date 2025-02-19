package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import java.util.List;

public record AddCoursesToSectionRequest(
        List<Long> courseIds
) {
}
