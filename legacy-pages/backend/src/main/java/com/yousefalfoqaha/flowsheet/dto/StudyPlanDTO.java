package com.yousefalfoqaha.flowsheet.dto;

import java.util.List;
import java.util.Map;

public record StudyPlanDTO(
        long id,
        String name,
        String track,
        int academicStartYear,
        int academicEndYear,
        List<SectionDTO> sections
) {
}
