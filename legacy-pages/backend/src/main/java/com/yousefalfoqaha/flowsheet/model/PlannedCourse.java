package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("planned_course")
public record PlannedCourse (
        @Column("course_id")
        AggregateReference<Course, Long> courseId,
        @Column("academic_period_id")
        AggregateReference<AcademicPeriod, Long> academicPeriodId
) {
}
