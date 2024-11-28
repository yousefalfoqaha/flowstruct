package com.yousefalfoqaha.gjuplans.program.dto.response;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramSummaryResponse(
        long id,
        String name,
        Degree degree
) {
}
