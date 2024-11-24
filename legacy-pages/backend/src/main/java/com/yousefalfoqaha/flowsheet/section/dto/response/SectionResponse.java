package com.yousefalfoqaha.flowsheet.section.dto.response;

import java.util.List;

public record SectionResponse(
        long id,
        String name,
        int requiredCreditHours,
        String type,
        List<Long> courses
) {
}
