package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanResponse;
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
    public ResponseEntity<List<StudyPlanOptionResponse>> getAllStudyPlans() {
        return new ResponseEntity<>(studyPlanService.getAllStudyPlans(), HttpStatus.OK);
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanResponse> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlan(studyPlanId), HttpStatus.OK);
    }
}
