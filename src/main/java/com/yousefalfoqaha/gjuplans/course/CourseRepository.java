package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends ListCrudRepository<Course, Long> {

    @Query(
            "SELECT id " +
            "FROM course " +
            "WHERE name " +
            "ILIKE :search " +
            "OR code " +
            "ILIKE :search " +
            "LIMIT :limit " +
            "OFFSET :offset"
    )
    List<Long> findAllBySearchQuery(String search, int limit, long offset);

    @Query(
            "SELECT COUNT(*) " +
            "FROM Course " +
            "WHERE name " +
            "ILIKE :search " +
            "OR code " +
            "ILIKE :search"
    )
    long countAllBySearchQuery(String search);
}
