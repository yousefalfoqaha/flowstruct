package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.dto.request.UpdateStudyPlanRequest;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/study-plans")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;

    @Autowired
    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @GetMapping
    public ResponseEntity<List<StudyPlanSummaryResponse>> getAllStudyPlans() {
        return new ResponseEntity<>(studyPlanService.getAllStudyPlans(), HttpStatus.OK);
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
    public ResponseEntity<StudyPlanSummaryResponse> updateStudyPlan(
            @PathVariable long studyPlanId,
            @RequestBody UpdateStudyPlanRequest request
    ) {
        return new ResponseEntity<>(studyPlanService.updateStudyPlan(studyPlanId, request), HttpStatus.OK);
    }

}
