package com.yousefalfoqaha.gjuplans.program.dto;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramOptionResponse(
        long id,
        String code,
        String name,
        Degree degree
) {
}
