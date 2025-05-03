package com.yousefalfoqaha.gjuplans.studyplan.dto;

public record StudyPlanSummaryDto(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program
) {
}
