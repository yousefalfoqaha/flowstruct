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
            "ILIKE :filter " +
            "OR code " +
            "ILIKE :filter " +
            "LIMIT :limit " +
            "OFFSET :offset"
    )
    List<Long> findAllByFilter(int limit, long offset, String filter);

    @Query(
            "SELECT COUNT(*) " +
            "FROM Course " +
            "WHERE name " +
            "ILIKE :filter " +
            "OR code " +
            "ILIKE :filter"
    )
    long countByFilter(String filter);

    boolean existsByCodeIgnoreCase(String code);
}
