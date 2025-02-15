package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

public record CreateSectionRequest(
        SectionLevel level,
        SectionType type,
        int requiredCreditHours,
        String name
) {
}
