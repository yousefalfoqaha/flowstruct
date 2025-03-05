package com.yousefalfoqaha.gjuplans.course.service;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.CourseRepository;
import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CourseSequences;
import com.yousefalfoqaha.gjuplans.course.dto.request.CreateCourseRequest;
import com.yousefalfoqaha.gjuplans.course.dto.response.*;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseResponseMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CoursesPageResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseGraphService courseGraphService;
    private final ObjectValidator<CreateCourseRequest> createCourseValidator;
    private final CourseResponseMapper courseResponseMapper;
    private final CoursesPageResponseMapper coursesPageResponseMapper;

    public CoursesPageResponse getPaginatedCourses(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        var searchParam = '%' + search + '%';

        var courseIds = courseRepository.findAllBySearchQuery(
                searchParam,
                pageable.getPageSize(),
                pageable.getOffset()
        );

        var courses = courseRepository.findAllById(courseIds);
        var total = courseRepository.countAllBySearchQuery(searchParam);

        Page<Course> coursesPage = new PageImpl<>(courses, pageable, total);

        return coursesPageResponseMapper.apply(coursesPage);
    }

    public Map<Long, CourseResponse> getCoursesByIds(List<Long> courseIds, boolean withPrerequisites) {
        var courses = courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, courseResponseMapper));

        if (!withPrerequisites) return courses;

        Set<Long> missingCourseIds = new HashSet<>();

        courses.forEach((_, course) -> {
            course.prerequisites().forEach(prerequisite -> {
                if (courses.get(prerequisite.prerequisite()) == null) {
                    missingCourseIds.add(prerequisite.prerequisite());
                }
            });
        });

        var missingCourses = courseRepository.findAllById(missingCourseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, courseResponseMapper));

        courses.putAll(missingCourses);

        return courses;
    }

    public CourseResponse getCourse(long courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException(
                        "Course with id " + courseId + " was not found."
                ));

        return courseResponseMapper.apply(course);
    }

    public Map<Long, CourseWithSequencesResponse> getCoursesWithSequences(List<Long> courseIds) {
        Map<Long, Course> courses = courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, course -> course));

        Map<Long, CourseSequences> courseSequencesMap = courseGraphService.buildCourseSequences(courses);

        return courses.values()
                .stream()
                .collect(Collectors.toMap(
                        Course::getId,
                        course -> new CourseWithSequencesResponse(
                                courseResponseMapper.apply(course),
                                new CourseSequencesResponse(
                                        courseSequencesMap.get(course.getId()).getPrerequisiteSequence()
                                                .stream()
                                                .filter(prereqId -> course.getPrerequisites()
                                                        .stream()
                                                        .noneMatch(p -> p.getPrerequisite().getId().equals(prereqId)))
                                                .collect(Collectors.toSet()),
                                        courseSequencesMap.get(course.getId()).getPostrequisiteSequence(),
                                        courseSequencesMap.get(course.getId()).getLevel()
                                )
                        )
                ));
    }

    public Map<Long, CourseResponse> getCourses(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, courseResponseMapper));
    }

    public CourseResponse createCourse(CreateCourseRequest request) {
        createCourseValidator.validate(request);

        var savedCourse = courseRepository.save(
                new Course(
                        null,
                        request.code(),
                        request.name(),
                        request.creditHours(),
                        request.ects(),
                        request.lectureHours(),
                        request.practicalHours(),
                        request.type(),
                        request.isRemedial(),
                        request.prerequisites(),
                        request.corequisites()
                )
        );

        return courseResponseMapper.apply(savedCourse);
    }
}