package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateStudyPlanRequest(

        @NotNull(message = "Study plan is not available.")
        long id,

        @NotNull(message = "Study plan must have a year")
        int year,

        @NotNull(message = "Duration cannot be empty.")
        @Min(value = 1, message = "Duration must be at least 1 year.")
        int duration,


        String track
) {
}
