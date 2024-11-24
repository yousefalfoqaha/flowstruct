package com.yousefalfoqaha.flowsheet.school.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@Getter
@Setter
@Table("school")
public class School {
    @Id
    private long id;
    private String name;
}
