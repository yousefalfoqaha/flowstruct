package com.yousefalfoqaha.flowsheet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Map;

@Table("study_plan")
public record StudyPlan(
        @Id
        long id,
        String name,
        @MappedCollection(idColumn = "study_plan_id", keyColumn = "id")
        Map<Long, Section> sections,
        @JsonIgnore
        @MappedCollection(idColumn = "study_plan_id", keyColumn = "id")
        Map<Long, Semester> semesters
) {
}
