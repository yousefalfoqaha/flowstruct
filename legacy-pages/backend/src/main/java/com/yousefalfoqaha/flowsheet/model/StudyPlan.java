package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Set;

@Table("study_plan")
public record StudyPlan(
        @Id
        @Column("id")
        long id,
        @Column("name")
        String name,
        @Column("track")
        String track,
        @Column("start_academic_year")
        int startAcademicYear,
        @Column("end_academic_year")
        int endAcademicYear,
        @MappedCollection(idColumn = "study_plan")
        Set<Section> sections
) {
}
