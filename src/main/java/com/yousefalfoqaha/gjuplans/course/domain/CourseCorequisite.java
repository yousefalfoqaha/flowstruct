package com.yousefalfoqaha.gjuplans.course.domain;

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
@Table("course_corequisite")
public class CourseCorequisite {
    private AggregateReference<Course, Long> corequisite;
}
