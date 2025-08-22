package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record SectionDetailsDto(
        SectionLevel level,

        SectionType type,

        @Min(value = 0, message = "Section cannot have less than 0 required credit hours.")
        int requiredCreditHours,

        @NotNull(message = "Name cannot be undefined.")
        String name
) {
}
