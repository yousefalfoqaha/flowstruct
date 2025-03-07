package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionLevel;
import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

import java.util.Map;

public record SectionResponse(
    long id,
    SectionLevel level,
    SectionType type,
    int requiredCreditHours,
    String name,
    Map<Long, SectionCourseResponse> courses
) {
}
