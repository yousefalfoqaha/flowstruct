package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.util.Map;
import java.util.Set;

public record StudyPlanDraft(
        int year,
        int duration,
        String track,
        AggregateReference<Program, Long> program,
        Set<Section> sections,
        Map<Long, Placement> coursePlacements,
        Set<CoursePrerequisite> coursePrerequisites,
        Set<CourseCorequisite> courseCorequisites
) {
}
