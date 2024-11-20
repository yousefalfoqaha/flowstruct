package com.yousefalfoqaha.flowsheet.model;


import com.yousefalfoqaha.flowsheet.enums.Degree;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("program")
public record Program (
    @Id
    @Column("id")
    long id,
    @Column("name")
    String name,
    @Column("degree")
    Degree degree,
    @MappedCollection(idColumn = "program")
    Set<StudyPlan> studyPlans
) {
}
