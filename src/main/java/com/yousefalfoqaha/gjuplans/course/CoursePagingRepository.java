package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursePagingRepository extends PagingAndSortingRepository<Course, Long> {

    @Query("SELECT id FROM course")
    List<Long> testRepoMethod(String name, Pageable pageable);
}
