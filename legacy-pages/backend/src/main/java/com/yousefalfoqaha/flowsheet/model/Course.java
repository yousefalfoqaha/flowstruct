package com.yousefalfoqaha.flowsheet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import java.util.Set;

@Table("course")
public record Course (
        @Id
        long id,
        String code,
        String name,
        int creditHours,
        boolean isRemedial,
        @MappedCollection(idColumn = "course_id")
        Set<Prerequisite> prerequisites
) {
}
