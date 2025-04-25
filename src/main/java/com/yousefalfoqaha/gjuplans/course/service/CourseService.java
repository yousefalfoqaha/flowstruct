package com.yousefalfoqaha.gjuplans.course.service;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.course.CourseRepository;
import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.request.CourseDetailsRequest;
import com.yousefalfoqaha.gjuplans.course.dto.response.*;
import com.yousefalfoqaha.gjuplans.course.exception.CourseNotFoundException;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseResponseMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CourseSummaryResponseMapper;
import com.yousefalfoqaha.gjuplans.course.mapper.CoursesPageResponseMapper;
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
    //    private final CourseGraphService courseGraphService;
    private final ObjectValidator<CourseDetailsRequest> courseDetailsValidator;
    private final CourseResponseMapper courseResponseMapper;
    private final CourseSummaryResponseMapper courseSummaryResponseMapper;
    private final CoursesPageResponseMapper coursesPageResponseMapper;

    public CoursesPageResponse getPaginatedCourses(int page, int size, String filter) {
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

    public Map<Long, CourseSummaryResponse> getCoursesById(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, courseSummaryResponseMapper));
    }

    public CourseResponse getCourse(long courseId) {
        var course = findCourse(courseId);

        return courseResponseMapper.apply(course);
    }

//    public Map<Long, CourseWithSequencesResponse> getCoursesWithSequences(List<Long> courseIds) {
//        Map<Long, Course> courses = courseRepository.findAllById(courseIds)
//                .stream()
//                .collect(Collectors.toMap(Course::getId, course -> course));
//
//        Map<Long, CourseSequences> courseSequencesMap = courseGraphService.buildCourseSequences(courses);
//
//        return courses.values()
//                .stream()
//                .collect(Collectors.toMap(
//                        Course::getId,
//                        course -> new CourseWithSequencesResponse(
//                                courseResponseMapper.apply(course),
//                                new CourseSequencesResponse(
//                                        courseSequencesMap.get(course.getId()).getPrerequisiteSequence()
//                                                .stream()
//                                                .filter(prereqId -> course.getPrerequisites()
//                                                        .stream()
//                                                        .noneMatch(p -> p.getPrerequisite().getId().equals(prereqId)))
//                                                .collect(Collectors.toSet()),
//                                        courseSequencesMap.get(course.getId()).getPostrequisiteSequence(),
//                                        courseSequencesMap.get(course.getId()).getLevel()
//                                )
//                        )
//                ));
//    }

    public CourseResponse editCourseDetails(long courseId, CourseDetailsRequest request) {
        courseDetailsValidator.validate(request);

        var course = findCourse(courseId);

        course.setCode(request.code());
        course.setName(request.name());
        course.setCreditHours(request.creditHours());
        course.setEcts(request.ects());
        course.setLectureHours(request.lectureHours());
        course.setPracticalHours(request.practicalHours());
        course.setType(request.type());
        course.setRemedial(request.isRemedial());

        return saveAndMap(course, courseResponseMapper);
    }

    public CourseResponse createCourse(CourseDetailsRequest request) {
        courseDetailsValidator.validate(request);

        var newCourse = new Course(
                null,
                request.code(),
                request.name(),
                request.creditHours(),
                request.ects(),
                request.lectureHours(),
                request.practicalHours(),
                request.type(),
                request.isRemedial(),
                null
        );

        return saveAndMap(newCourse, courseResponseMapper);
    }

    private Course findCourse(long id) {
        return courseRepository.findById(id).orElseThrow(() -> new CourseNotFoundException("Course with id " + id + " was not found."));
    }

    private <T> T saveAndMap(Course course, Function<Course, T> mapper) {
        var savedCourse = courseRepository.save(course);
        return mapper.apply(savedCourse);
    }
}
