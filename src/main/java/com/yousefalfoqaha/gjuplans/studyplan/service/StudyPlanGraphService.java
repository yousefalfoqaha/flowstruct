package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.course.domain.CourseSequences;
import com.yousefalfoqaha.gjuplans.studyplan.domain.Relation;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudyPlanGraphService {
    public Map<Long, CourseSequences> buildStudyPlanSequences(
            Map<Long, Map<Long, Relation>> coursePrerequisites,
            List<Long> courseIds
    ) {
        Set<Long> visited = new HashSet<>();
        Map<Long, CourseSequences> courseSequencesMap = new HashMap<>();

        for (var courseId : courseIds) {
            courseSequencesMap.put(
                    courseId,
                    new CourseSequences(new HashSet<>(), new HashSet<>(), 1)
            );
        }

        for (var courseId : courseIds) {
            if (!visited.contains(courseId)) {
                traversePrerequisites(courseId, coursePrerequisites, visited, courseSequencesMap);
            }
        }

        visited.clear();

        for (var courseId : courseIds) {
            if (!visited.contains(courseId)) {
                traversePostrequisites(courseId, visited, courseSequencesMap);
            }
        }

        return courseSequencesMap;
    }

    private void traversePrerequisites(
            long courseId,
            Map<Long, Map<Long, Relation>> coursePrerequisites,
            Set<Long> visited,
            Map<Long, CourseSequences> courseSequencesMap
    ) {
        if (coursePrerequisites.get(courseId) == null) return;

        var prerequisites = coursePrerequisites.get(courseId).entrySet();

        for (var prerequisite : prerequisites) {
            var prerequisiteId = prerequisite.getKey();

            if (!visited.contains(prerequisiteId)) {
                traversePrerequisites(prerequisiteId, coursePrerequisites, visited, courseSequencesMap);
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
            Set<Long> visited,
            Map<Long, CourseSequences> courseSequencesMap
    ) {
        var courseSequences = courseSequencesMap.get(courseId);

        var postrequisiteCourses = new HashSet<>(courseSequences.getPostrequisiteSequence());

        for (var postrequisiteId : postrequisiteCourses) {
            if (!visited.contains(postrequisiteId)) {
                traversePostrequisites(postrequisiteId, visited, courseSequencesMap);
            }

            var postrequisiteCourseSequences = courseSequencesMap.get(postrequisiteId);

            courseSequences.getPostrequisiteSequence().add(postrequisiteId);
            courseSequences.getPostrequisiteSequence()
                    .addAll(postrequisiteCourseSequences.getPostrequisiteSequence());
        }

        visited.add(courseId);
    }
}
