package com.yousefalfoqaha.flowsheet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Reference;
import org.springframework.data.relational.core.mapping.Table;

@Table("course_mapping")
public record CourseMapping(
        long courseId,
        long semesterId,
        int rowIndex
) {
}
