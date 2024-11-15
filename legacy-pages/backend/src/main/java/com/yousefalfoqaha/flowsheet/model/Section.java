package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("section")
public record Section(
        @Id
        long id,
        String name,
        int requiredCreditHours,
        @MappedCollection(idColumn = "section_id")
        Set<SectionCourse> courses
) {
}
