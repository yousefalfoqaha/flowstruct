package com.yousefalfoqaha.flowsheet.section;

public record CreateSectionRequest(
        String name,
        int requiredCreditHours,
        SectionType type,
        Long parentId
) {
}
