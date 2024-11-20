package com.yousefalfoqaha.flowsheet.dto;

import java.util.List;

public record SectionDTO(
        long id,
        String name,
        int requiredCreditHours,
        List<Long> courses
) {
}
