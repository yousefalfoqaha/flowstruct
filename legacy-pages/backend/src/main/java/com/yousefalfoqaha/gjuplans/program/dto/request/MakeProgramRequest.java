package com.yousefalfoqaha.gjuplans.program.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record MakeProgramRequest(

    @NotEmpty(message = "Name cannot be empty.")
    String name,

    @NotEmpty(message = "Program must offer a degree.")
    String degree
) {
}
