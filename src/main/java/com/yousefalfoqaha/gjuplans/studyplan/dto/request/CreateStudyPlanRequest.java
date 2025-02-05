package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateStudyPlanRequest (

    @NotNull(message = "Year cannot be empty.")
    int year,

    String track,

    @NotNull(message = "Study plan must belong to a program.")
    long program
) {
}
