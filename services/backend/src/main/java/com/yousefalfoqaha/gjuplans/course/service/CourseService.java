package com.yousefalfoqaha.gjuplans.course.service;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSummaryDto;
import com.yousefalfoqaha.gjuplans.course.dto.CoursesPageDto;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseDtoMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseSummaryResponseMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CoursesPageResponseMapper;
import com.yousefalfoqaha.gjuplans.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseDtoMapper courseDtoMapper;
    private final CourseSummaryResponseMapper courseSummaryResponseMapper;
    private final CoursesPageResponseMapper coursesPageResponseMapper;

    public CoursesPageDto getPaginatedCourseList(int page, int size, String filter, boolean archived) {
        Pageable pageable = PageRequest.of(page, size);
        var filterParam = '%' + filter + '%';

        var courseIds = archived ?
                courseRepository.findAllArchivedByFilter(
                        pageable.getPageSize(),
                        pageable.getOffset(),
                        filterParam
                ) :
                courseRepository.findAllByFilter(
                        pageable.getPageSize(),
                        pageable.getOffset(),
                        filterParam
                );

        var courses = courseRepository.findAllById(courseIds);
        var total = archived
                ? courseRepository.countArchivedByFilter(filterParam)
                : courseRepository.countByFilter(filterParam);

        Page<Course> coursesPage = new PageImpl<>(courses, pageable, total);

        return coursesPageResponseMapper.apply(coursesPage);
    }

    public Map<Long, CourseSummaryDto> getCourseList(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .map(courseSummaryResponseMapper)
                .collect(Collectors.toMap(CourseSummaryDto::id, Function.identity()));
    }

    public Map<Long, CourseDto> getDetailedCourseList(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .map(courseDtoMapper)
                .collect(Collectors.toMap(CourseDto::id, Function.identity()));
    }

    public CourseDto getCourse(long courseId) {
        var course = findOrThrow(courseId);
        return courseDtoMapper.apply(course);
    }

    public Course findOrThrow(long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course was not found."));
    }

    public CourseDto saveAndMap(Course course) {
        var savedCourse = courseRepository.save(course);
        return courseDtoMapper.apply(savedCourse);
    }
}
