package com.yousefalfoqaha.gjuplans.studyplan;

import java.util.List;

public record SectionResponse(
    long id,
    SectionLevel level,
    SectionType type,
    List<Long> courses
) {
}
