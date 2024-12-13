package com.yousefalfoqaha.gjuplans.course.dto;

import java.util.Set;

public record CourseSequencesResponse(
        Set<Long> prerequisiteSequence,
        Set<Long> postrequisiteSequence,
        int level
) {
}
