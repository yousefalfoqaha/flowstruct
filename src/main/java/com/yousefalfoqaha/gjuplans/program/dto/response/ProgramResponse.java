package com.yousefalfoqaha.gjuplans.program.dto.response;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramResponse(
        long id,
        String code,
        String name,
        String degree
) {
}
