package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("student_mapping")
public record StudentMapping(
        @Column("section_course_id")
        AggregateReference<SectionCourse, Long> course,
        @Column("semester_id")
        AggregateReference<Semester, Long> semester,
        int rowIndex
) {
}
