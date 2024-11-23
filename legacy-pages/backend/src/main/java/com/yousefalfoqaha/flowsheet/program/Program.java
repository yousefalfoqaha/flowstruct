package com.yousefalfoqaha.flowsheet.program;

import com.yousefalfoqaha.flowsheet.school.School;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Table("program")
public record Program (
    @Id
    long id,
    String name,
    Degree degree,
    AggregateReference<School, Long> school
) {
}
