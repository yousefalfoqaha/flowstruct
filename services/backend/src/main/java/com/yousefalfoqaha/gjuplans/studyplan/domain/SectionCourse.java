package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import jakarta.validation.constraints.NotNull;
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
@Table("section_course")
public class SectionCourse {
    private AggregateReference<Course, Long> course;
}
