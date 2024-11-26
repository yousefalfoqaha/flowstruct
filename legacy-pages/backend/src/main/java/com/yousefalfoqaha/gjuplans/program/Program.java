package com.yousefalfoqaha.gjuplans.program;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("program")
public record Program (
    @Id
    long id,
    String name,
    Degree degree
) {
}
