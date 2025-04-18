package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateStudyPlanRequest (

    @NotNull(message = "Year cannot be empty.")
    int year,

    @NotNull(message = "Duration cannot be empty.")
    @Min(value = 1, message = "Duration must be at least 1 year.")
    int duration,

    String track,

    boolean isPrivate,

    @NotNull(message = "Study plan must belong to a program.")
    long program
) {
}
