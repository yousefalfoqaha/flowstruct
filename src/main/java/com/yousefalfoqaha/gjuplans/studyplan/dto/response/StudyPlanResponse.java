package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import java.util.List;
import java.util.Map;

public record StudyPlanResponse(
        long id,
        int year,
        int duration,
        String track,
        boolean isPrivate,
        long program,
        List<SectionResponse> sections,
        Map<Long, Integer> coursePlacements
) {
}
