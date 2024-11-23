package com.yousefalfoqaha.flowsheet.student;

import com.yousefalfoqaha.flowsheet.academicperiod.AcademicPeriod;
import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("planned_course")
public record PlannedCourse (
        @Column("course")
        AggregateReference<Course, Long> course,
        @Column("academic_period")
        AggregateReference<AcademicPeriod, Long> academicPeriod
) {
}
