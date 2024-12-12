package com.yousefalfoqaha.gjuplans.program.dto;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramResponse(
        long id,
        String code,
        String name,
        Degree degree
) {
}
