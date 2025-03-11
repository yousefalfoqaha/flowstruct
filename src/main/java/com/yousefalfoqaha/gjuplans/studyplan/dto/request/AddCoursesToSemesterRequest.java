package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import java.util.List;

public record AddCoursesToSemesterRequest(
        List<Long> courseIds,
        int semester
) {
}