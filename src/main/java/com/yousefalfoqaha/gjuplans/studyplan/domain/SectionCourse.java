package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("section_course")
public class SectionCourse {

    @Id
    private Long id;

    private AggregateReference<Course, Long> course;

    @MappedCollection(idColumn = "section_course_id")
    private Set<CoursePrerequisite> prerequisites = new HashSet<>();

    @MappedCollection(idColumn = "section_course_id")
    private Set<CourseCorequisite> corequisites = new HashSet<>();
}
