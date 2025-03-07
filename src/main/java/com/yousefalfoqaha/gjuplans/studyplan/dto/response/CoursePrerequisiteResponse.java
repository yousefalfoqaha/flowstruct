package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

public record CoursePrerequisiteResponse(
        long prerequisite,
        Relation relation
) {
}
