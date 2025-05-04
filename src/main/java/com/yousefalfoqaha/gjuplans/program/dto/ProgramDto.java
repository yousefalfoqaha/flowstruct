package com.yousefalfoqaha.gjuplans.program.dto;

public record ProgramDto(
        long id,
        String code,
        String name,
        String degree,
        boolean isPrivate
) {
}
