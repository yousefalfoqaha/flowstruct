package com.yousefalfoqaha.gjuplans.program.dto.response;

public record ProgramSummaryResponse(
        long id,
        String code,
        String name,
        String degree,
        boolean isPrivate
) {
}
