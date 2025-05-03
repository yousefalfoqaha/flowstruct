package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.domain.MoveDirection;
import com.yousefalfoqaha.gjuplans.studyplan.dto.*;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanCourseService;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study-plans")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;
    private final StudyPlanCourseService studyPlanCourseService;

    @GetMapping
    public ResponseEntity<List<StudyPlanSummaryDto>> getAllStudyPlans() {
        return new ResponseEntity<>(studyPlanService.getAllStudyPlans(), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}/courses")
    public ResponseEntity<Map<Long, CourseSummaryResponse>> getStudyPlanCourses(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanCourseService.getStudyPlanCourses(studyPlanId), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}/courses/detailed")
    public ResponseEntity<Map<Long, CourseResponse>> getStudyPlanDetailedCourses(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanCourseService.getStudyPlanDetailedCourses(studyPlanId), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}/with-sequences")
    public ResponseEntity<StudyPlanWithSequencesDto> getStudyPlanCoursesWithSequences(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlanWithSequences(studyPlanId), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlan(studyPlanId), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/toggle-visibility")
    public ResponseEntity<StudyPlanDto> toggleVisibility(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.toggleVisibility(studyPlanId), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> editStudyPlanDetails(
            @PathVariable long studyPlanId,
            @RequestBody StudyPlanDetailsDto studyPlanDetails
    ) {
        return new ResponseEntity<>(studyPlanService.editStudyPlanDetails(studyPlanId, studyPlanDetails), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StudyPlanDto> createStudyPlan(@RequestBody StudyPlanDetailsDto studyPlanDetails) {
        return new ResponseEntity<>(studyPlanService.createStudyPlan(studyPlanDetails), HttpStatus.OK);
    }

    @DeleteMapping("/{studyPlanId}")
    public ResponseEntity<Void> deleteStudyPlan(@PathVariable long studyPlanId) {
        studyPlanService.deleteStudyPlan(studyPlanId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{studyPlanId}/course-placements")
    public ResponseEntity<StudyPlanDto> placeSemesterCourses(
            @PathVariable long studyPlanId,
            @RequestBody SemesterCoursesDto semesterCourses
    ) {
        return new ResponseEntity<>(studyPlanService.placeSemesterCourses(studyPlanId, semesterCourses), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/create-section")
    public ResponseEntity<StudyPlanDto> createSection(
            @PathVariable long studyPlanId,
            @RequestBody SectionDetailsDto request
    ) {
        return new ResponseEntity<>(studyPlanService.createSection(studyPlanId, request), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanDto> editSectionDetails(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestBody SectionDetailsDto request
    ) {
        return new ResponseEntity<>(studyPlanService.editSectionDetails(studyPlanId, sectionId, request), HttpStatus.OK);
    }

    @DeleteMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanDto> deleteSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId
    ) {
        return new ResponseEntity<>(studyPlanService.deleteSection(studyPlanId, sectionId), HttpStatus.OK);
    }

    @PostMapping("/{studyPlanId}/sections/{sectionId}/courses")
    public ResponseEntity<StudyPlanDto> addSectionCourses(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.addSectionCourses(studyPlanId, sectionId, courseIds),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/by-ids")
    public ResponseEntity<StudyPlanDto> removeCoursesFromStudyPlan(
            @PathVariable long studyPlanId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeStudyPlanCourse(studyPlanId, courseIds),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/prerequisites")
    public ResponseEntity<StudyPlanDto> linkCoursePrerequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestBody List<CoursePrerequisiteDto> prerequisites
    ) {
        return new ResponseEntity<>(
                studyPlanService.linkCoursePrerequisites(studyPlanId, courseId, prerequisites),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/prerequisites/{prerequisiteId}")
    public ResponseEntity<StudyPlanDto> unlinkCoursePrerequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long prerequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.unlinkCoursePrerequisites(studyPlanId, courseId, prerequisiteId),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/corequisites")
    public ResponseEntity<StudyPlanDto> linkCourseCorequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> corequisiteIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.linkCourseCorequisites(studyPlanId, courseId, corequisiteIds),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/corequisites/{corequisiteId}")
    public ResponseEntity<StudyPlanDto> unlinkCourseCorequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long corequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.unlinkCourseCorequisites(studyPlanId, courseId, corequisiteId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/courses/{courseId}/move-to-section/{sectionId}")
    public ResponseEntity<StudyPlanDto> moveCourseSection(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long sectionId
    ) {
        return new ResponseEntity<>(
                studyPlanService.moveCourseSection(studyPlanId, courseId, sectionId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/sections/{sectionId}/move")
    public ResponseEntity<StudyPlanDto> moveSectionPosition(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestParam(value = "direction", defaultValue = "") MoveDirection direction
    ) {
        return new ResponseEntity<>(
                studyPlanService.moveSectionPosition(studyPlanId, sectionId, direction),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/course-placements/{courseId}")
    public ResponseEntity<StudyPlanDto> removeCoursePlacement(
            @PathVariable long studyPlanId,
            @PathVariable long courseId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCoursePlacement(studyPlanId, courseId),
                HttpStatus.OK
        );
    }
}
