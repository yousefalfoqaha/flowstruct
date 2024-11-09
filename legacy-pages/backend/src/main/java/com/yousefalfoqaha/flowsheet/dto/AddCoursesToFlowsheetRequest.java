package com.yousefalfoqaha.flowsheet.dto;

import java.util.List;
import java.util.UUID;

public record AddCoursesToFlowsheetRequest(
        List<Long> courseIds,
        long semesterId
) {}
