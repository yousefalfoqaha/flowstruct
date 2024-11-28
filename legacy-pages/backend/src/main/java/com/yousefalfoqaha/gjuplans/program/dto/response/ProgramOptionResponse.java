package com.yousefalfoqaha.gjuplans.program.dto.response;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramOptionResponse(
        long id,
        String name,
        Degree degree
) {
}
