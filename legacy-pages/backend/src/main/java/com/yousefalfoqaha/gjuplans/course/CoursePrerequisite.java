package com.yousefalfoqaha.gjuplans.course;

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
@Table("course_prerequisite")
public class CoursePrerequisite {
        private AggregateReference<Course, Long> prerequisite;

        private Relation relation;
}
