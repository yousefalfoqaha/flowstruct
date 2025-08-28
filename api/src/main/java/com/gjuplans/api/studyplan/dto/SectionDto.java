package com.gjuplans.api.studyplan.dto;

import com.gjuplans.api.studyplan.domain.SectionLevel;
import com.gjuplans.api.studyplan.domain.SectionType;

import java.util.List;

public record SectionDto(
        long id,
        SectionLevel level,
        SectionType type,
        int requiredCreditHours,
        String name,
        int position,
        List<Long> courses
) {
}
