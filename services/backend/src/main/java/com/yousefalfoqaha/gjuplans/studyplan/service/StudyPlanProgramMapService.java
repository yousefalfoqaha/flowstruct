package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.studyplan.domain.Placement;
import com.yousefalfoqaha.gjuplans.studyplan.dto.PlacementDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import com.yousefalfoqaha.gjuplans.studyplan.utils.ProgramMapUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class StudyPlanProgramMapService {
    private final StudyPlanService studyPlanService;
    private final ProgramMapUtils programMapUtils;

    @Transactional
    public StudyPlanDto moveCourseToSemester(
            long studyPlanId,
            long courseId,
            PlacementDto targetPlacement
    ) {
        var studyPlan = studyPlanService.findOrThrow(studyPlanId);

        if (targetPlacement.year() > studyPlan.getDuration()) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        var oldPlacement = studyPlan.getCoursePlacements().get(courseId);
        var newPlacement = new Placement(
                targetPlacement.year(),
                targetPlacement.semester(),
                targetPlacement.position(),
                targetPlacement.span()
        );

        if (oldPlacement == null) {
            throw new CourseNotPlacedException("Course was not already placed in the program map.");
        }

        if (programMapUtils.comparePlacement(oldPlacement, newPlacement) == 0 && oldPlacement.getPosition() == newPlacement.getPosition()) {
            throw new InvalidCoursePlacement("Course is already in the same place");
        }

        boolean prerequisitesFulfilled = studyPlan.getCoursePrerequisites()
                .stream()
                .filter(cp -> Objects.equals(cp.getCourse().getId(), courseId))
                .allMatch(cp -> {
                    var prerequisitePlacement = studyPlan.getCoursePlacements().get(cp.getPrerequisite().getId());

                    if (prerequisitePlacement == null) {
                        return true;
                    }

                    return programMapUtils.comparePlacement(prerequisitePlacement, newPlacement) < 0;
                });

        if (!prerequisitesFulfilled) {
            throw new InvalidCoursePlacement("Cannot place a course in the same or earlier term as its prerequisite");
        }

        boolean postrequisitesFulfilled = studyPlan.getCoursePrerequisites()
                .stream()
                .filter(cp -> Objects.equals(cp.getPrerequisite().getId(), courseId))
                .allMatch(cp -> {
                    var postrequisitePlacement = studyPlan.getCoursePlacements().get(cp.getCourse().getId());

                    if (postrequisitePlacement == null) {
                        return true;
                    }

                    return programMapUtils.comparePlacement(postrequisitePlacement, newPlacement) > 0;
                });

        if (!postrequisitesFulfilled) {
            throw new InvalidCoursePlacement("Cannot place a course in the same or later term as its postrequisite");
        }

        programMapUtils.deleteCoursePlacement(studyPlan, courseId, oldPlacement);
        programMapUtils.insertCoursePlacement(studyPlan, courseId, newPlacement);

        return studyPlanService.saveAndMap(studyPlan);
    }


    @Transactional
    public StudyPlanDto placeCoursesInSemester(long studyPlanId, List<Long> courseIds, PlacementDto targetPlacement) {
        var studyPlan = studyPlanService.findOrThrow(studyPlanId);

        var coursePrerequisitesMap = studyPlan.getCoursePrerequisitesMap();

        if (targetPlacement.year() > studyPlan.getDuration()) {
            throw new OutOfBoundsPositionException("Out of bounds year");
        }

        int lastPosition = studyPlan.getCoursePlacements().values()
                .stream()
                .filter(currentPlacement ->
                        programMapUtils.comparePlacement(
                                new Placement(
                                        targetPlacement.year(),
                                        targetPlacement.semester(),
                                        1,
                                        1
                                ),
                                currentPlacement
                        ) == 0
                )
                .mapToInt(Placement::getPosition)
                .max()
                .orElse(0);

        for (var courseId : courseIds) {
            if (studyPlan.getCoursePlacements().containsKey(courseId)) {
                throw new CourseAlreadyAddedException("A course already exists in the program map.");
            }

            var individualCoursePlacement = new Placement(
                    targetPlacement.year(),
                    targetPlacement.semester(),
                    ++lastPosition,
                    1
            );

            var prerequisites = coursePrerequisitesMap.get(courseId);

            if (prerequisites != null) {
                prerequisites.forEach(prerequisite -> {
                    var prerequisitePlacement = studyPlan.getCoursePlacements().get(prerequisite.getPrerequisite().getId());
                    if (prerequisitePlacement == null || programMapUtils.comparePlacement(prerequisitePlacement, individualCoursePlacement) >= 0) {
                        throw new InvalidCoursePlacement("A course has missing prerequisites or has prerequisites in later semesters.");
                    }
                });
            }

            studyPlan.getCoursePlacements().put(courseId, individualCoursePlacement);
        }

        return studyPlanService.saveAndMap(studyPlan);
    }

    @Transactional
    public StudyPlanDto resizeCoursePlacement(long studyPlanId, long courseId, int span) {
        if (span < 1 || span > 5) {
            throw new InvalidSpanException("A course cannot span less than 1 or larger than 5 courses.");
        }

        var studyPlan = studyPlanService.findOrThrow(studyPlanId);

        var coursePlacement = studyPlan.getCoursePlacements().get(courseId);

        if (coursePlacement == null) {
            throw new CourseNotPlacedException("Course not placed in a term");
        }

        coursePlacement.setSpan(span);

        return studyPlanService.saveAndMap(studyPlan);
    }

    @Transactional
    public StudyPlanDto removeCourseFromSemester(long studyPlanId, long courseId) {
        var studyPlan = studyPlanService.findOrThrow(studyPlanId);

        programMapUtils.deleteCoursePlacement(
                studyPlan,
                courseId,
                studyPlan.getCoursePlacements().get(courseId)
        );

        return studyPlanService.saveAndMap(studyPlan);
    }
}
