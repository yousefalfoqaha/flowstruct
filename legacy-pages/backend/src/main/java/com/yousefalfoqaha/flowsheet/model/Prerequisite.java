package com.yousefalfoqaha.flowsheet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yousefalfoqaha.flowsheet.enums.RelationType;
import org.springframework.data.relational.core.mapping.Table;

@Table("prerequisite")
public record Prerequisite(
        long courseId,
        long requisiteId,
        RelationType relation
) {
}
