package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.relational.core.mapping.Table;

@Table("section_course")
public record SectionCourse(
        long sectionId,
        long courseId
) {
}
