package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

import java.util.Set;

public record SectionResponse(
    long id,
    SectionLevel level,
    SectionType type,
    int requiredCreditHours,
    String name,
    int position,
    Set<Long> courses
) {
}
