package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

import java.util.List;
import java.util.Map;
import java.util.Set;

public record StudyPlanResponse(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program,
        List<SectionResponse> sections,
        Map<Long, Integer> coursePlacements,
        Map<Long, Map<Long, Relation>> coursePrerequisites,
        Map<Long, Set<Long>> courseCorequisites
) {
}
