package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

public record CoursePrerequisiteRequest(
        long prerequisite,
        Relation relation
) {
}
