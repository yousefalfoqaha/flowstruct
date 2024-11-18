package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Table("section")
public record Section(
        @Id
        @Column("id")
        long id,
        @Column("name")
        String name,
        @Column("required_credit_hours")
        int requiredCreditHours,
        @MappedCollection(idColumn = "section_id")
        Set<SectionCourse> courseIds
) {
}
