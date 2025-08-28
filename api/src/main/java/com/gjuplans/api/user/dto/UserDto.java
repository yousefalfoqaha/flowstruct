package com.gjuplans.api.user.dto;

import java.time.Instant;

public record UserDto(
        long id,
        String username,
        String email,
        String role,
        Instant createdAt,
        Instant updatedAt
) {
}
