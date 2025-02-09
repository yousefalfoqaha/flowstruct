package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CoursePagingRepository extends PagingAndSortingRepository<Course, Long> {

    Page<Course> findByCodeContainingIgnoreCaseAndNameContainingIgnoreCase(String code, String name, Pageable pageable);
}
