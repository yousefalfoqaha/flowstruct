package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.dto.request.*;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study-plans")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;

    @GetMapping
    public ResponseEntity<List<StudyPlanSummaryResponse>> getProgramStudyPlans(
            @RequestParam(value = "program", defaultValue = "") long programId
    ) {
        return new ResponseEntity<>(studyPlanService.getProgramStudyPlans(programId), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanResponse> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlan(studyPlanId), HttpStatus.OK);
    }

    @PutMapping("/{studyPlanId}/toggle-visibility")
    public ResponseEntity<Void> toggleVisibility(@PathVariable long studyPlanId) {
        studyPlanService.toggleVisibility(studyPlanId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanSummaryResponse> editStudyPlanDetails(
            @PathVariable long studyPlanId,
            @RequestBody EditStudyPlanDetailsRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.editStudyPlanDetails(studyPlanId, request), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StudyPlanSummaryResponse> createStudyPlan(@RequestBody CreateStudyPlanRequest request) {
        return new ResponseEntity<>(studyPlanService.createStudyPlan(request), HttpStatus.OK);
    }

    @DeleteMapping("/{studyPlanId}")
    public ResponseEntity<Void> deleteStudyPlan(@PathVariable long studyPlanId) {
        studyPlanService.deleteStudyPlan(studyPlanId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{studyPlanId}/add-courses")
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

    @DeleteMapping("/{studyPlanId}/courses/{courseId}")
    public ResponseEntity<StudyPlanResponse> removeCourseFromStudyPlan(
            @PathVariable long studyPlanId,
            @PathVariable long courseId
    ) {
        return new ResponseEntity<>(
                studyPlanService.removeCourseFromSection(studyPlanId, courseId),
                HttpStatus.OK
        );
    }
}
