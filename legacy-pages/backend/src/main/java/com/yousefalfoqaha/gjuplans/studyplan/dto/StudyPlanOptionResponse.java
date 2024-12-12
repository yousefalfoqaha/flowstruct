package com.yousefalfoqaha.gjuplans.studyplan.dto;

public record StudyPlanOptionResponse(
        long id,
        int startAcademicYear,
        TrackResponse track,
        long program
) {
}
