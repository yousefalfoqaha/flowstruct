package com.yousefalfoqaha.gjuplans.course.dto.response;

import com.yousefalfoqaha.gjuplans.course.domain.Relation;

public record CoursePrerequisiteResponse(
        long prerequisite,
        Relation relation
) {
}
