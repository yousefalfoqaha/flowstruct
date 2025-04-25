package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.dto.response.CourseSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.domain.MoveDirection;
import com.yousefalfoqaha.gjuplans.studyplan.dto.request.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
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
    public ResponseEntity<List<StudyPlanSummaryResponse>> getAllStudyPlans() {
        return new ResponseEntity<>(studyPlanService.getAllStudyPlans(), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}/courses")
    public ResponseEntity<Map<Long, CourseSummaryResponse>> getStudyPlanCourses(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanCourseService.getStudyPlanCourses(studyPlanId), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanResponse> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlan(studyPlanId), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/toggle-visibility")
    public ResponseEntity<StudyPlanResponse> toggleVisibility(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.toggleVisibility(studyPlanId), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanResponse> editStudyPlanDetails(
            @PathVariable long studyPlanId,
            @RequestBody EditStudyPlanDetailsRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.editStudyPlanDetails(studyPlanId, request), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StudyPlanResponse> createStudyPlan(@RequestBody CreateStudyPlanRequest request) {
        return new ResponseEntity<>(studyPlanService.createStudyPlan(request), HttpStatus.OK);
    }

    @DeleteMapping("/{studyPlanId}")
    public ResponseEntity<Void> deleteStudyPlan(@PathVariable long studyPlanId) {
        studyPlanService.deleteStudyPlan(studyPlanId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{studyPlanId}/course-placements")
    public ResponseEntity<StudyPlanResponse> addCoursesToSemester(
            @PathVariable long studyPlanId,
            @RequestBody AddCoursesToSemesterRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.addCoursesToSemester(studyPlanId, request), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/create-section")
    public ResponseEntity<StudyPlanResponse> createSection(
            @PathVariable long studyPlanId,
            @RequestBody CreateSectionRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.createSection(studyPlanId, request), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanResponse> editSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestBody EditSectionRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.editSection(studyPlanId, sectionId, request), HttpStatus.OK);
    }

    @DeleteMapping("/{studyPlanId}/sections/{sectionId}")
    public ResponseEntity<StudyPlanResponse> deleteSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId
    ) {
        return new ResponseEntity<>(studyPlanService.deleteSection(studyPlanId, sectionId), HttpStatus.OK);
    }

    @PostMapping("/{studyPlanId}/sections/{sectionId}/courses")
    public ResponseEntity<StudyPlanResponse> addCoursesToSection(
            @PathVariable long studyPlanId,
            @PathVariable long sectionId,
            @RequestBody AddCoursesToSectionRequest request
    ) {
        return new ResponseEntity<>(
                studyPlanService.addCoursesToSection(studyPlanId, sectionId, request),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/by-ids")
    public ResponseEntity<StudyPlanResponse> removeCoursesFromStudyPlan(
            @PathVariable long studyPlanId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCourseFromSection(studyPlanId, courseIds),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/prerequisites")
    public ResponseEntity<StudyPlanResponse> assignCoursePrerequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestBody List<CoursePrerequisiteRequest> prerequisiteRequests
    ) {
        return new ResponseEntity<>(
                studyPlanService.assignCoursePrerequisites(studyPlanId, courseId, prerequisiteRequests),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/prerequisites/{prerequisiteId}")
    public ResponseEntity<StudyPlanResponse> removeCoursePrerequisite(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long prerequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCoursePrerequisite(studyPlanId, courseId, prerequisiteId),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/courses/{courseId}/corequisites")
    public ResponseEntity<StudyPlanResponse> assignCourseCorequisites(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestBody List<Long> corequisiteRequests
    ) {
        return new ResponseEntity<>(
                studyPlanService.assignCourseCorequisites(studyPlanId, courseId, corequisiteRequests),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}/courses/{courseId}/corequisites/{corequisiteId}")
    public ResponseEntity<StudyPlanResponse> removeCourseCorequisite(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @PathVariable long corequisiteId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCourseCorequisite(studyPlanId, courseId, corequisiteId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/courses/{courseId}/move-to-section/{sectionId}")
    public ResponseEntity<StudyPlanResponse> moveCourseToSection(
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
    public ResponseEntity<StudyPlanResponse> moveSectionPositionUp(
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
    public ResponseEntity<StudyPlanResponse> removeCoursePlacement(
            @PathVariable long studyPlanId,
            @PathVariable long courseId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCoursePlacement(studyPlanId, courseId),
                HttpStatus.OK
        );
    }
}
