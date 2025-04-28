package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import java.util.Set;

public record CourseSequencesResponse(
        Set<Long> prerequisiteSequence,
        Set<Long> postrequisiteSequence,
        int level
) {
}
