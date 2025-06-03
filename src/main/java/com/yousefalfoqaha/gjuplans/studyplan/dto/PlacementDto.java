package com.yousefalfoqaha.gjuplans.studyplan.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record PlacementDto(

        @Min(value = 1, message = "A course cannot be placed in a year less than 1.")
        int year,

        @Size(min = 1, max = 3, message = "Semester must be between 1 and 3.")
        int semester,

        @Min(value = 1, message = "Course cannot be placed in a position less than 1.")
        int position,

        @Size(min = 1, max = 5, message = "A course can only span from 1 to 5 courses.")
        int span
) {
}
