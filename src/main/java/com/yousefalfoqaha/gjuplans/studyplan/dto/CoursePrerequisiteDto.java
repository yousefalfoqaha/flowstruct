package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

public record CoursePrerequisiteDto(
        long prerequisite,
        Relation relation
) {
}
