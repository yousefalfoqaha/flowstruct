package com.yousefalfoqaha.flowsheet.section.dto.request;

import com.yousefalfoqaha.flowsheet.section.domain.SectionType;
import lombok.NonNull;

public record CreateSectionRequest(
        @NonNull
        String name,
        int requiredCreditHours,
        SectionType type,
        Long parentId
) {
}
