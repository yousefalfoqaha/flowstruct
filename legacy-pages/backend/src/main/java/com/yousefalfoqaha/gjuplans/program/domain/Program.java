package com.yousefalfoqaha.gjuplans.program;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("program")
public class Program {

    @Id
    private long id;

    private String name;

    private Degree degree;
}
