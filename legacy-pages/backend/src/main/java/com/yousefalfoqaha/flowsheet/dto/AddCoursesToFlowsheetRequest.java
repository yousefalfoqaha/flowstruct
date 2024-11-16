package com.yousefalfoqaha.flowsheet.dto;

import java.util.List;

public record AddCoursesToFlowsheetRequest(
        List<Long> courseIds,
        long semesterId
) {
}
