package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.relational.core.mapping.Table;

@Table("semester_whitelist")
public record SemesterWhitelist(
        long semesterId,
        long courseId
) {
}
