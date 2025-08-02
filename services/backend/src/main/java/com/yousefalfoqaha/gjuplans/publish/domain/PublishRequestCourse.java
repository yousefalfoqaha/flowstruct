package com.yousefalfoqaha.gjuplans.publish.domain;

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
@Table("publish_request_course")
public class PublishRequestCourse {

    AggregateReference<Course, Long> course;
}
