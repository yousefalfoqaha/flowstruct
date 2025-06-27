package com.yousefalfoqaha.gjuplans.studyplan.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("course_placement")
public class Placement {

    private int year;

    private int semester;

    private int position;

    private int span;
}
