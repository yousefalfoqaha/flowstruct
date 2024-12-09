package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CoursePrerequisite;
import com.yousefalfoqaha.gjuplans.course.dto.response.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Map<Long, CourseResponse> getCoursesById(List<Long> courseIds) {
        Map<Long, Course> courses = courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, course -> course));

        return courses
                .values()
                .stream()
                .collect(Collectors.toMap(
                        c -> c.getId(),
                        c -> new CourseResponse(
                                c.getId(),
                                c.getCode(),
                                c.getName(),
                                c.getCreditHours(),
                                c.getPrerequisites()
                                        .stream()
                                        .collect(Collectors.toMap(
                                                pr -> pr.getPrerequisite().getId(),
                                                pr -> new CoursePrerequisiteResponse(
                                                        pr.getPrerequisite().getId(),
                                                        pr.getRelation()
                                        ))
                                ))
                ));
    }

    private List<Long> getPrerequisiteSequence(
            Long courseId,
            Map<Long, Course> allCourses
    ) {
        Set<Long> visited = new HashSet<>();
        Set<Long> cycle = new HashSet<>();
        List<Long> prerequisiteSequence = new ArrayList<>();

        Course course = allCourses.get(courseId);

        if (course == null) {
            return prerequisiteSequence;
        }

        findPrerequisites(course, allCourses, visited, cycle, prerequisiteSequence);

        return prerequisiteSequence;
    }

    private void findPrerequisites(
            Course course,
            Map<Long, Course> allCourses,
            Set<Long> visited,
            Set<Long> cycle,
            List<Long> prerequisiteSequence
    ) {
        if (visited.contains(course.getId())) {
            return;
        }

        if (cycle.contains(course.getId())) {
            throw new IllegalStateException("Cycle detected in prerequisites for course " + course.getCode());
        }

        visited.add(course.getId());
        cycle.add(course.getId());

        for (CoursePrerequisite prereq : course.getPrerequisites()) {
            Course prereqCourse = allCourses.get(prereq.getPrerequisite().getId());

            if (prereqCourse != null) {
                findPrerequisites(prereqCourse, allCourses, visited, cycle, prerequisiteSequence);
            }
        }

        prerequisiteSequence.add(course.getId());

        cycle.remove(course.getId());
    }
}
