package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

import java.util.List;

public record SectionResponse(
    long id,
    SectionLevel level,
    SectionType type,
    int requiredCreditHours,
    String name,
    List<Long> courses
) {
}
