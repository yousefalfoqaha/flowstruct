package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CoursePrerequisite;
import com.yousefalfoqaha.gjuplans.course.dto.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.CourseResponse;
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

        Map<Long, Integer> courseLevels = new HashMap<>();
        Map<Long, Set<CoursePrerequisite>> prerequisiteSequences =
                getPrerequisiteSequencesAndLevels(courses, courseLevels);

        return courses
                .values()
                .stream()
                .collect(Collectors.toMap(
                        Course::getId,
                        course -> new CourseResponse(
                                course.getId(),
                                course.getCode(),
                                course.getName(),
                                course.getCreditHours(),
                                courseLevels.get(course.getId()),
                                course.getPrerequisites()
                                        .stream()
                                        .map(prerequisite -> new CoursePrerequisiteResponse(
                                                prerequisite.getPrerequisite().getId(),
                                                prerequisite.getRelation()
                                        ))
                                        .collect(Collectors.toSet()),
                                prerequisiteSequences.get(course.getId())
                                        .stream()
                                        .map(prerequisite -> new CoursePrerequisiteResponse(
                                                prerequisite.getPrerequisite().getId(),
                                                prerequisite.getRelation()
                                        ))
                                        .collect(Collectors.toSet())
                        )
                ));
    }

    private void dfs(
            long courseId,
            Map<Long, Course> courses,
            Set<Long> visited,
            Map<Long, Set<CoursePrerequisite>> prerequisiteSequenceMap,
            Map<Long, Integer> courseLevelMap
    ) {
        prerequisiteSequenceMap.putIfAbsent(courseId, new HashSet<>());
        courseLevelMap.putIfAbsent(courseId, 1);
        var course = courses.get(courseId);

        for (var prerequisite : course.getPrerequisites()) {
            var prerequisiteId = prerequisite.getPrerequisite().getId();
            prerequisiteSequenceMap.putIfAbsent(prerequisiteId, new HashSet<>());

            if (!visited.contains(prerequisiteId)) {
                dfs(prerequisiteId, courses, visited, prerequisiteSequenceMap, courseLevelMap);
            }

            prerequisiteSequenceMap.get(courseId).addAll(prerequisiteSequenceMap.get(prerequisiteId));
            prerequisiteSequenceMap.get(courseId).add(prerequisite);

            if (courseLevelMap.get(courseId) <= courseLevelMap.get(prerequisiteId)) {
                var level = courseLevelMap.get(prerequisiteId);
                courseLevelMap.put(courseId, level + 1);
            }
        }

        visited.add(courseId);
    }

    private Map<Long, Set<CoursePrerequisite>> getPrerequisiteSequencesAndLevels(
            Map<Long, Course> courses,
            Map<Long, Integer> courseLevelMap
    ) {
        Set<Long> visited = new HashSet<>();
        Map<Long, Set<CoursePrerequisite>> prerequisiteSequenceMap = new HashMap<>();

        for (var courseId : courses.keySet()) {
            if (!visited.contains(courseId)) {
                dfs(courseId, courses, visited, prerequisiteSequenceMap, courseLevelMap);
            }
        }

        return prerequisiteSequenceMap;
    }
}
