package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends ListCrudRepository<Course, Long> {
}
