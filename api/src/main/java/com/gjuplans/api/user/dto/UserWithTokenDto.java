package com.gjuplans.api.user.dto;

public record UserWithTokenDto(
        UserDto user,
        String token
) {
}
