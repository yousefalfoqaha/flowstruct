package com.yousefalfoqaha.flowsheet.model;

import com.yousefalfoqaha.flowsheet.enums.Semester;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("academic_period")
public record AcademicPeriod (
        @Id
        @Column("id")
        long id,
        @Column("academic_year")
        int academic_year,
        @Column("semester")
        Semester semester
) {
}
