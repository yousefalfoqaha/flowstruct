package com.yousefalfoqaha.gjuplans.user.dto;

import java.time.Instant;

public record UserDto(
        long id,
        String username,
        Instant createdAt,
        Instant updatedAt,
        Long updatedBy
) {
}
