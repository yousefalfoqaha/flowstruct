package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDetailsDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSummaryDto;
import com.yousefalfoqaha.gjuplans.course.dto.CoursesPageDto;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseDtoMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseSummaryResponseMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CoursesPageResponseMapper;
import com.yousefalfoqaha.gjuplans.studyplan.exception.CourseExistsException;
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

    public CoursesPageDto getPaginatedCourseList(int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        var filterParam = '%' + filter + '%';

        var courseIds = courseRepository.findAllByFilter(
                pageable.getPageSize(),
                pageable.getOffset(),
                filterParam
        );

        var courses = courseRepository.findAllById(courseIds);
        var total = courseRepository.countByFilter(filterParam);

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
        var course = findCourse(courseId);
        return courseDtoMapper.apply(course);
    }

    public CourseDto editCourseDetails(long courseId, CourseDetailsDto details) {
        var course = findCourse(courseId);

        if (courseRepository.existsByCodeIgnoreCase(course.getCode()) && !course.getCode().equalsIgnoreCase(details.code())) {
            throw new CourseExistsException("Course with code " + details.code() + " already exists.");
        }

        course.setCode(details.code());
        course.setName(details.name());
        course.setCreditHours(details.creditHours());
        course.setEcts(details.ects());
        course.setLectureHours(details.lectureHours());
        course.setPracticalHours(details.practicalHours());
        course.setType(details.type());
        course.setRemedial(details.isRemedial());

        return saveAndMap(course, courseDtoMapper);
    }

    public CourseDto createCourse(CourseDetailsDto details) {
        if (courseRepository.existsByCodeIgnoreCase(details.code())) {
            throw new CourseExistsException("Course with code " + details.code() + " already exists.");
        }

        var newCourse = new Course(
                null,
                details.code().toUpperCase(),
                details.name(),
                details.creditHours(),
                details.ects(),
                details.lectureHours(),
                details.practicalHours(),
                details.type(),
                details.isRemedial(),
                null,
                null,
                null
        );

        return saveAndMap(newCourse, courseDtoMapper);
    }

    private Course findCourse(long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course with id " + id + " was not found."));
    }

    private <T> T saveAndMap(Course course, Function<Course, T> mapper) {
        var savedCourse = courseRepository.save(course);
        return mapper.apply(savedCourse);
    }
}
