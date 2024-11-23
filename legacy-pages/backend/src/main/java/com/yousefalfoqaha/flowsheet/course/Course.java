package com.yousefalfoqaha.flowsheet.course;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("course")
public record Course (
        @Id
        @Column("id")
        long id,
        @Column("code")
        String code,
        @Column("name")
        String name,
        @Column("credit_hours")
        int creditHours,
        @Column("is_remedial")
        boolean isRemedial,
        @MappedCollection(idColumn = "course")
        Set<CoursePrerequisite> prerequisites
) {
}
