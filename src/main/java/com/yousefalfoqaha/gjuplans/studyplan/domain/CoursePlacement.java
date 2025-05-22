package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("course_placement")
public class CoursePlacement {

    private AggregateReference<Course, Long> course;

    private int year;

    private int semester;

    private int row;

    private int span;
}
