package com.yousefalfoqaha.flowsheet.studyplan;

import java.util.List;

public record StudyPlanDTO(
        long id,
        String name,
        String track,
        int academicStartYear,
        int academicEndYear,
        List<SectionDTO> sections
) {
}
