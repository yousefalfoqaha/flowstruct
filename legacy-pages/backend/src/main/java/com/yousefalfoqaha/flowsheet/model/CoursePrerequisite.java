package com.yousefalfoqaha.flowsheet.model;

import com.yousefalfoqaha.flowsheet.enums.RelationType;
import org.springframework.data.relational.core.mapping.Table;

@Table("course_prerequisite")
public record CoursePrerequisite(
        long prerequisiteId,
        RelationType relation
) {
}
