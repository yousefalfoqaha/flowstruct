package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/study-plans")
@CrossOrigin("http://localhost:5173/")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;

    @Autowired
    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @GetMapping("/{studyPlanId}")
    public ResponseEntity<StudyPlanResponse> getStudyPlan(@PathVariable long studyPlanId) {
        return new ResponseEntity<>(studyPlanService.getStudyPlan(studyPlanId), HttpStatus.OK);
    }
}
