package com.yousefalfoqaha.flowsheet.program.domain;

import com.yousefalfoqaha.flowsheet.school.domain.School;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@Table("program")
public record Program (
    @Id
    long id,
    String name,
    Degree degree,
    AggregateReference<School, Long> school
) {
}
