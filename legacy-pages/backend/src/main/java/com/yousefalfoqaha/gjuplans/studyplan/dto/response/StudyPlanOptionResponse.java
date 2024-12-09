package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

public record StudyPlanOptionResponse(
        long id,
        int startAcademicYear,
        TrackResponse track,
        long program
) {
}
