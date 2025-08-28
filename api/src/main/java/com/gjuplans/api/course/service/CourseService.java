package com.gjuplans.api.course.service;

import com.gjuplans.api.course.domain.Course;
import com.gjuplans.api.course.domain.OutdatedFilter;
import com.gjuplans.api.course.dto.CourseDto;
import com.gjuplans.api.course.dto.CourseSummaryDto;
import com.gjuplans.api.course.dto.CoursesPageDto;
import com.gjuplans.api.course.exception.CourseNotFoundException;
import com.gjuplans.api.course.mapper.CourseDtoMapper;
import com.gjuplans.api.course.mapper.CourseSummaryDtoMapper;
import com.gjuplans.api.course.mapper.CoursesPageResponseMapper;
import com.gjuplans.api.course.repository.CourseRepository;
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
    private final CourseSummaryDtoMapper courseSummaryDtoMapper;
    private final CoursesPageResponseMapper coursesPageResponseMapper;

    public CoursesPageDto getPaginatedCourseList(int page, int size, String filter, OutdatedFilter status) {
        Pageable pageable = PageRequest.of(page, size);
        var filterParam = '%' + filter + '%';
        var statusParam = status.name();

        var results = courseRepository.findPagedCourses(
                pageable.getPageSize(),
                pageable.getOffset(),
                filterParam,
                statusParam
        );

        if (results.isEmpty()) {
            return new CoursesPageDto(List.of(), pageable.getPageNumber(),
                    pageable.getPageSize(), 0, 0, true);
        }

        List<Course> courses = results.stream()
                .map(row -> new Course(
                        row.id(),
                        row.code(),
                        row.name(),
                        row.creditHours(),
                        row.ects(),
                        row.lectureHours(),
                        row.practicalHours(),
                        row.type(),
                        row.isRemedial(),
                        row.outdatedAt(),
                        row.outdatedBy(),
                        row.version(),
                        row.createdAt(),
                        row.updatedAt(),
                        row.updatedBy()
                ))
                .toList();

        long totalCount = results.getFirst().totalCourses();

        Page<Course> coursesPage = new PageImpl<>(
                courses,
                pageable,
                totalCount
        );

        return coursesPageResponseMapper.apply(coursesPage);
    }

    public Map<Long, CourseSummaryDto> getCourseList(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .map(courseSummaryDtoMapper)
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
