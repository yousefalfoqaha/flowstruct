package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

import java.util.Set;

public record EditSectionRequest(
        long id,
        SectionLevel level,
        SectionType type,
        int requiredCreditHours,
        String name
) {
}
