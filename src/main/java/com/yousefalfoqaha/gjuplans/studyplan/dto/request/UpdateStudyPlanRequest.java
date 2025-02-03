package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateStudyPlanRequest(

        @NotNull(message = "Study plan is not available.")
        long id,

        @NotNull(message = "Study plan must have a year")
        int year,

        String track
) {
}
