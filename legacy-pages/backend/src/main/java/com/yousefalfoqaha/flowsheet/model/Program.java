package com.yousefalfoqaha.flowsheet.model;


import com.yousefalfoqaha.flowsheet.enums.DegreeType;
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
    DegreeType degree,
    @MappedCollection(idColumn = "program_id")
    Set<StudyPlan> studyPlans
) {
}
