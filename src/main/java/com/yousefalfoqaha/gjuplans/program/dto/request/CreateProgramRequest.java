package com.yousefalfoqaha.gjuplans.program.dto.request;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;
import jakarta.validation.constraints.NotEmpty;

public record CreateProgramRequest(

        @NotEmpty(message = "Code cannot be empty")
        String code,

        @NotEmpty(message = "Name cannot be empty")
        String name,

        Degree degree
) {
}
