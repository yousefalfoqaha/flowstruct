package com.yousefalfoqaha.gjuplans.course.service;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.CourseRepository;
import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CourseSequences;
import com.yousefalfoqaha.gjuplans.course.dto.request.CreateCourseRequest;
import com.yousefalfoqaha.gjuplans.course.dto.response.*;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseGraphService courseGraphService;
    private final ObjectValidator<CreateCourseRequest> createCourseValidator;

    public CourseResponse getCourse(long courseId) {
        var course =  courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException(
                        "Course with id " + courseId + " was not found."
                ));

        return new CourseResponse(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getCreditHours(),
                course.getEcts(),
                course.getLectureHours(),
                course.getPracticalHours(),
                course.getType(),
                course.isRemedial(),
                course.getPrerequisites()
                        .stream()
                        .map(prerequisite -> new CoursePrerequisiteResponse(
                                prerequisite.getPrerequisite().getId(),
                                prerequisite.getRelation()
                        ))
                        .collect(Collectors.toSet()),
                course.getCorequisites()
                        .stream()
                        .map(corequisite -> corequisite.getCorequisite().getId())
                        .collect(Collectors.toSet())
        );
    }

    public List<CourseSummaryResponse> getAllCourses() {
        return courseRepository.findAllCourseSummaries()
                .stream()
                .map(course -> new CourseSummaryResponse(
                        course.id(),
                        course.name(),
                        course.code(),
                        course.creditHours()
                ))
                .toList();
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
                                new CourseResponse(
                                        course.getId(),
                                        course.getCode(),
                                        course.getName(),
                                        course.getCreditHours(),
                                        course.getEcts(),
                                        course.getLectureHours(),
                                        course.getPracticalHours(),
                                        course.getType(),
                                        course.isRemedial(),
                                        course.getPrerequisites()
                                                .stream()
                                                .map(prerequisite -> new CoursePrerequisiteResponse(
                                                        prerequisite.getPrerequisite().getId(),
                                                        prerequisite.getRelation()
                                                ))
                                                .collect(Collectors.toSet()),
                                        course.getCorequisites()
                                                .stream()
                                                .map(corequisite -> corequisite.getCorequisite().getId())
                                                .collect(Collectors.toSet())
                                ),
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

    public CreateCourseResponse createCourse(CreateCourseRequest request) {
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

        return new CreateCourseResponse(savedCourse.getId());
    }
}