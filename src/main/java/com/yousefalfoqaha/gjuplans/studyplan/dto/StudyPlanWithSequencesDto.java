package com.yousefalfoqaha.gjuplans.studyplan.dto;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;

import java.util.List;
import java.util.Map;
import java.util.Set;

public record StudyPlanWithSequencesDto(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program,
        List<SectionDto> sections,
        Map<Long, Integer> coursePlacements,
        Map<Long, Map<Long, Relation>> coursePrerequisites,
        Map<Long, Set<Long>> courseCorequisites,
        Map<Long, CourseSequencesDto> courseSequences
) {
}
