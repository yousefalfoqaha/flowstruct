package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("suggested_mapping")
public class SuggestedMapping {
    @Column("section_course_id")
    long sectionCourseId;
}
