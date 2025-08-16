package com.yousefalfoqaha.gjuplans.studyplan.controller;

import com.yousefalfoqaha.gjuplans.studyplan.dto.ApprovalRequestDetailsDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDetailsDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanSummaryDto;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanApprovalService;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanManagerService;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study-plans")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;
    private final StudyPlanApprovalService studyPlanApprovalService;
    private final StudyPlanManagerService studyPlanManagerService;

    @GetMapping
    public ResponseEntity<List<StudyPlanSummaryDto>> getAllStudyPlans() {
        return new ResponseEntity<>(
                studyPlanService.getAllStudyPlans(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{studyPlanId}/approved")
    public ResponseEntity<StudyPlanDto> getApprovedStudyPlan(@PathVariable long studyPlanId) {
        return studyPlanService.getApprovedStudyPlan(studyPlanId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanService.getStudyPlan(studyPlanId),
                HttpStatus.OK
        );
    }

    @PostMapping("{studyPlanId}/request-approval")
    public ResponseEntity<Void> requestStudyPlansApproval(
            @Valid @RequestBody ApprovalRequestDetailsDto approvalRequest,
            @PathVariable long studyPlanId
    ) {
        studyPlanApprovalService.requestApproval(approvalRequest, studyPlanId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyPlanId}/approve-changes")
    public ResponseEntity<StudyPlanDto> approveStudyPlanChanges(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanApprovalService.approveStudyPlanChanges(studyPlanId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/discard-changes")
    public ResponseEntity<StudyPlanDto> discardStudyPlanChanges(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanManagerService.discardStudyPlanChanges(studyPlanId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanDto> editStudyPlanDetails(
            @PathVariable long studyPlanId,
            @Valid @RequestBody StudyPlanDetailsDto studyPlanDetails
    ) {
        return new ResponseEntity<>(
                studyPlanManagerService.editStudyPlanDetails(studyPlanId, studyPlanDetails),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<StudyPlanDto> createStudyPlan(@Valid @RequestBody StudyPlanDetailsDto studyPlanDetails) {
        return new ResponseEntity<>(
                studyPlanManagerService.createStudyPlan(studyPlanDetails),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{studyPlanId}")
    public ResponseEntity<Void> deleteStudyPlan(@PathVariable long studyPlanId) {
        studyPlanManagerService.deleteStudyPlan(studyPlanId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyPlanId}/archive")
    public ResponseEntity<StudyPlanDto> archiveStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanManagerService.archiveStudyPlan(studyPlanId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{studyPlanId}/unarchive")
    public ResponseEntity<StudyPlanDto> unarchiveStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(
                studyPlanManagerService.unarchiveStudyPlan(studyPlanId),
                HttpStatus.OK
        );
    }

    @PostMapping("/{studyPlanId}/clone")
    public ResponseEntity<StudyPlanDto> cloneStudyPlan(
            @PathVariable long studyPlanId,
            @Valid @RequestBody StudyPlanDetailsDto cloneDetails
    ) {
        return new ResponseEntity<>(
                studyPlanManagerService.cloneStudyPlan(studyPlanId, cloneDetails),
                HttpStatus.OK
        );
    }
}
