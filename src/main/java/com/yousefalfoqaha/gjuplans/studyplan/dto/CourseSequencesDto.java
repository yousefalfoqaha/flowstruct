package com.yousefalfoqaha.gjuplans.studyplan.dto;

import java.util.Set;

public record CourseSequencesDto(
        Set<Long> prerequisiteSequence,
        Set<Long> postrequisiteSequence,
        int level
) {
}
