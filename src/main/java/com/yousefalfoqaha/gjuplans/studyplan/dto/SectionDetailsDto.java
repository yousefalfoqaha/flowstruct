package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

public record SectionDetailsDto(
        SectionLevel level,
        SectionType type,
        int requiredCreditHours,
        String name
) {
}
