package com.yousefalfoqaha.gjuplans.studyplan.projection;

public record StudyPlanOptionProjection(
        Long id,
        Integer year,
        String track,
        boolean isPrivate,
        Long program
) {
}

