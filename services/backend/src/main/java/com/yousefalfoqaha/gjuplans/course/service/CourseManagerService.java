package com.yousefalfoqaha.gjuplans.course.service;

import com.yousefalfoqaha.gjuplans.common.CodeFormatter;
import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDetailsDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.repository.CourseRepository;
import com.yousefalfoqaha.gjuplans.studyplan.exception.CourseExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Instant;

@PreAuthorize("hasRole('ROLE_EDITOR')")
@RequiredArgsConstructor
@Service
public class CourseManagerService {
    private final CourseService courseService;
    private final CourseRepository courseRepository;
    private final CodeFormatter codeFormatter;

    public CourseDto editCourseDetails(long courseId, CourseDetailsDto details) {
        var course = courseService.findOrThrow(courseId);

        String courseCode = codeFormatter.apply(course.getCode());
        String userEnteredCode = codeFormatter.apply(details.code());

        if (courseRepository.existsByCodeIgnoreCase(userEnteredCode) && !courseCode.equalsIgnoreCase(userEnteredCode)) {
            throw new CourseExistsException("Course with code " + details.code() + " already exists.");
        }

        course.setCode(userEnteredCode);
        course.setName(details.name().trim());
        course.setCreditHours(details.creditHours());
        course.setEcts(details.ects());
        course.setLectureHours(details.lectureHours());
        course.setPracticalHours(details.practicalHours());
        course.setType(details.type());
        course.setRemedial(details.isRemedial());

        return courseService.saveAndMap(course);
    }

    public CourseDto createCourse(CourseDetailsDto details) {
        String userEnteredCode = codeFormatter.apply(details.code());

        if (courseRepository.existsByCodeIgnoreCase(userEnteredCode)) {
            throw new CourseExistsException("Course with code " + userEnteredCode + " already exists.");
        }

        var newCourse = new Course(
                null,
                userEnteredCode,
                details.name().trim(),
                details.creditHours(),
                details.ects(),
                details.lectureHours(),
                details.practicalHours(),
                details.type(),
                details.isRemedial(),
                null,
                null,
                null,
                null,
                null
        );

        return courseService.saveAndMap(newCourse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteCourse(long courseId) {
        courseRepository.deleteById(courseId);
    }

    public CourseDto archiveCourse(long courseId) {
        var course = courseService.findOrThrow(courseId);
        course.setDeletedAt(Instant.now());
        return courseService.saveAndMap(course);
    }

    public CourseDto unarchiveCourse(long courseId) {
        var course = courseService.findOrThrow(courseId);
        course.setDeletedAt(null);
        return courseService.saveAndMap(course);
    }
}
