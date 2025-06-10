package com.yousefalfoqaha.gjuplans.program.dto;

import java.time.Instant;

public record ProgramDto(
        long id,
        String code,
        String name,
        String degree,
        Instant createdAt,
        Instant updatedAt
) {
}
