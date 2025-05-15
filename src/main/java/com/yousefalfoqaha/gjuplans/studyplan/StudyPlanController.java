package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSummaryDto;
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
        return new ResponseEntity<>(
                studyPlanService.getAllStudyPlans(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{studyPlanId}/courses")
    public ResponseEntity<Map<Long, CourseSummaryDto>> getStudyPlanCourseList(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanCourseService.getStudyPlanCourseList(studyPlanId),
                HttpStatus.OK
        );
    }

    @GetMapping("/{studyPlanId}/courses/detailed")
    public ResponseEntity<Map<Long, CourseDto>> getStudyPlanDetailedCourseList(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanCourseService.getStudyPlanDetailedCourseList(studyPlanId),
                HttpStatus.OK
        );
    }

    @GetMapping("/{studyPlanId}/with-sequences")
    public ResponseEntity<StudyPlanWithSequencesDto> getStudyPlanCoursesWithSequences(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanService.getStudyPlanWithSequences(studyPlanId),
                HttpStatus.OK
        );
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanService.getStudyPlan(studyPlanId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/toggle-visibility")
    public ResponseEntity<StudyPlanDto> toggleVisibility(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanService.toggleVisibility(studyPlanId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> editStudyPlanDetails(
            @PathVariable long studyPlanId,
            @RequestBody StudyPlanDetailsDto studyPlanDetails
    ) {
        return new ResponseEntity<>(
                studyPlanService.editStudyPlanDetails(studyPlanId, studyPlanDetails),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<StudyPlanDto> createStudyPlan(@RequestBody StudyPlanDetailsDto studyPlanDetails) {
        return new ResponseEntity<>(
                studyPlanService.createStudyPlan(studyPlanDetails),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}")
    public ResponseEntity<Void> deleteStudyPlan(@PathVariable long studyPlanId) {
        studyPlanService.deleteStudyPlan(studyPlanId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{studyPlanId}/course-placements")
    public ResponseEntity<StudyPlanDto> placeCoursesInSemester(
            @PathVariable long studyPlanId,
            @RequestBody SemesterCoursesDto semesterCourses
    ) {
        return new ResponseEntity<>(
                studyPlanService.placeCoursesInSemester(studyPlanId, semesterCourses),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/create-section")
    public ResponseEntity<StudyPlanDto> createSection(
            @PathVariable long studyPlanId,
            @RequestBody SectionDetailsDto sectionDetails
    ) {
        return new ResponseEntity<>(
                studyPlanService.createSection(studyPlanId, sectionDetails),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanDto> editSectionDetails(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestBody SectionDetailsDto sectionDetails
    ) {
        return new ResponseEntity<>(
                studyPlanService.editSectionDetails(studyPlanId, sectionId, sectionDetails),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/course-placements/{courseId}")
    public ResponseEntity<StudyPlanDto> moveCourseToSemester(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestParam(value = "targetSemester") int targetSemester
    ) {
        return new ResponseEntity<>(
                studyPlanService.moveCourseToSemester(studyPlanId, courseId, targetSemester),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanDto> deleteSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId
    ) {
        return new ResponseEntity<>(
                studyPlanService.deleteSection(studyPlanId, sectionId),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/sections/{sectionId}/courses")
    public ResponseEntity<StudyPlanDto> addCoursesToStudyPlan(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.addCoursesToStudyPlan(studyPlanId, sectionId, courseIds),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses")
    public ResponseEntity<StudyPlanDto> removeCoursesFromStudyPlan(
            @PathVariable long studyPlanId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCoursesFromStudyPlan(studyPlanId, courseIds),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/prerequisites")
    public ResponseEntity<StudyPlanDto> linkPrerequisitesToCourse(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestBody List<CoursePrerequisiteDto> prerequisites
    ) {
        return new ResponseEntity<>(
                studyPlanService.linkPrerequisitesToCourse(studyPlanId, courseId, prerequisites),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/prerequisites/{prerequisiteId}")
    public ResponseEntity<StudyPlanDto> unlinkPrerequisitesFromCourse(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long prerequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.unlinkPrerequisitesFromCourse(studyPlanId, courseId, prerequisiteId),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/corequisites")
    public ResponseEntity<StudyPlanDto> linkCorequisitesToCourse(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> corequisiteIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.linkCorequisitesToCourse(studyPlanId, courseId, corequisiteIds),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/corequisites/{corequisiteId}")
    public ResponseEntity<StudyPlanDto> unlinkCorequisitesFromCourse(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long corequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.unlinkCorequisitesFromCourse(studyPlanId, courseId, corequisiteId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/sections/{targetSectionId}/move-courses")
    public ResponseEntity<StudyPlanDto> moveCourseToSection(
            @PathVariable long studyPlanId,
            @RequestParam(value = "courses") List<Long> courseIds,
            @PathVariable long targetSectionId
    ) {
        return new ResponseEntity<>(
                studyPlanService.moveCourseToSection(studyPlanId, courseIds, targetSectionId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/sections/{sectionId}/move")
    public ResponseEntity<StudyPlanDto> moveSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestParam(value = "direction", defaultValue = "") MoveDirection direction
    ) {
        return new ResponseEntity<>(
                studyPlanService.moveSection(studyPlanId, sectionId, direction),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/course-placements/{courseId}")
    public ResponseEntity<StudyPlanDto> removeCourseFromSemester(
            @PathVariable long studyPlanId,
            @PathVariable long courseId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCourseFromSemester(studyPlanId, courseId),
                HttpStatus.OK
        );
    }
}
