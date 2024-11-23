package com.yousefalfoqaha.flowsheet.section;

import com.yousefalfoqaha.flowsheet.course.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@Getter
@Setter
@Table("section_course")
public class SectionCourse {
    private AggregateReference<Course, Long> course;
}
