package com.yousefalfoqaha.gjuplans.user.dto;

import jakarta.validation.constraints.NotBlank;

public record UserDetailsDto(

        @NotBlank(message = "Username required.")
        String username,

        String newPassword,

        String confirmPassword
) {
}
