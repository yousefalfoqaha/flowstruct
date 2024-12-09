package com.yousefalfoqaha.gjuplans.studyplan.projection;

public record StudyPlanOptionProjection(
        Long id,
        Integer startAcademicYear,
        String trackCode,
        String trackName,
        Long program
) {
}

