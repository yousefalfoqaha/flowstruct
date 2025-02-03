package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.SectionType;

public record SectionCourseResponse(
    Long course,
    SectionType sectionType
) {
}
