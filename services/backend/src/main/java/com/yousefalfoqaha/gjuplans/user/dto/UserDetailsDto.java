package com.yousefalfoqaha.gjuplans.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserDetailsDto(

        @NotBlank(message = "Username required.")
        @Size(min = 3, message = "Username must be at least 3 characters long.")
        String username,

        @NotNull(message = "Undefined new password field.")
        String newPassword,

        @NotNull(message = "Undefined confirm password field.")
        String confirmPassword
) {
}
