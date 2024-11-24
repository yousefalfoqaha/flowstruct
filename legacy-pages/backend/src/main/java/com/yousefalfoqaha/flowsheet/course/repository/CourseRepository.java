package com.yousefalfoqaha.flowsheet.course.repository;

import com.yousefalfoqaha.flowsheet.course.domain.Course;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends ListCrudRepository<Course, Long> {
}
