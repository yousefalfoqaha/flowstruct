package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CourseSequences;
import com.yousefalfoqaha.gjuplans.course.dto.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSequencesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public Map<Long, CourseResponse> getCoursesById(List<Long> courseIds) {
        Map<Long, Course> courses = courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, course -> course));

        Map<Long, CourseSequences> courseSequencesMap = buildCourseSequences(courses);

        return courses.values()
                .stream()
                .collect(Collectors.toMap(
                        Course::getId,
                        course -> new CourseResponse(
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
                                        .collect(Collectors.toSet()),
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

    private void traversePrerequisites(
            long courseId,
            Map<Long, Course> courses,
            Set<Long> visited,
            Map<Long, CourseSequences> courseSequencesMap
    ) {
        var course = courses.get(courseId);

        for (var prerequisite : course.getPrerequisites()) {
            var prerequisiteId = prerequisite.getPrerequisite().getId();

            if (courses.get(prerequisiteId).isRemedial()) {
                continue;
            }

            if (!visited.contains(prerequisiteId)) {
                traversePrerequisites(prerequisiteId, courses, visited, courseSequencesMap);
            }

            var courseSequences = courseSequencesMap.get(courseId);
            var prerequisiteCourseSequences = courseSequencesMap.get(prerequisiteId);

            courseSequences.getPrerequisiteSequence()
                    .addAll(prerequisiteCourseSequences.getPrerequisiteSequence());

            courseSequences.getPrerequisiteSequence().add(prerequisiteId);

            prerequisiteCourseSequences.getPostrequisiteSequence().add(courseId);

            if (courseSequences.getLevel() <= prerequisiteCourseSequences.getLevel()) {
                courseSequences.setLevel(prerequisiteCourseSequences.getLevel() + 1);
            }
        }

        visited.add(courseId);
    }

    private void traversePostrequisites(
            long courseId,
            Map<Long, Course> courses,
            Set<Long> visited,
            Map<Long, CourseSequences> courseSequencesMap
    ) {
        var courseSequences = courseSequencesMap.get(courseId);
        var postrequisiteCourses = new HashSet<>(courseSequences.getPostrequisiteSequence());

        for (var postrequisiteId : postrequisiteCourses) {
            if (courses.get(postrequisiteId).isRemedial()) {
                continue;
            }

            if (!visited.contains(postrequisiteId)) {
                traversePostrequisites(postrequisiteId, courses, visited, courseSequencesMap);
            }

            var postrequisiteCourseSequences = courseSequencesMap.get(postrequisiteId);

            courseSequences.getPostrequisiteSequence().add(postrequisiteId);
            courseSequences.getPostrequisiteSequence()
                    .addAll(postrequisiteCourseSequences.getPostrequisiteSequence());
        }

        visited.add(courseId);
    }

    private Map<Long, CourseSequences> buildCourseSequences(Map<Long, Course> courses) {
        Set<Long> visited = new HashSet<>();
        Map<Long, CourseSequences> courseSequencesMap = new HashMap<>();

        for (var course : courses.values()) {
            courseSequencesMap.put(
                    course.getId(),
                    new CourseSequences(new HashSet<>(), new HashSet<>(), 1)
            );
        }

        for (var course : courses.values()) {
            if (!visited.contains(course.getId()) && !course.isRemedial()) {
                traversePrerequisites(course.getId(), courses, visited, courseSequencesMap);
            }
        }

        visited.clear();

        for (var course : courses.values()) {
            if (!visited.contains(course.getId()) && !course.isRemedial()) {
                traversePostrequisites(course.getId(), courses, visited, courseSequencesMap);
            }
        }

        return courseSequencesMap;
    }
}