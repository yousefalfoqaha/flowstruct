package com.yousefalfoqaha.gjuplans.user.dto;

public record UserWithTokenDto(
        UserDto user,
        String token
) {
}
