package com.yousefalfoqaha.gjuplans.user.dto;

import java.time.Instant;

public record UserDto(
        long id,
        String username,
        String email,
        Instant createdAt,
        Instant updatedAt
) {
}
