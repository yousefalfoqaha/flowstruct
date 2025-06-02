package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

public record StudyPlanDto(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program,
        Instant createdAt,
        Instant updatedAt,
        List<SectionDto> sections,
        Map<Long, CoursePlacementDto> coursePlacements,
        Map<Long, Map<Long, Relation>> coursePrerequisites,
        Map<Long, Set<Long>> courseCorequisites
) {
}
