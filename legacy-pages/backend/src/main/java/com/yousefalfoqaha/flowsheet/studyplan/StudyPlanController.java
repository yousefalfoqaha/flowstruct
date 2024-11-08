package com.yousefalfoqaha.flowsheet.studyplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studyplan")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;

    @Autowired
    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @GetMapping("/{studyPlanId}")
    public StudyPlanDTO getStudyPlanById(@PathVariable long studyPlanId) {
        return studyPlanService.getStudyPlanById(studyPlanId);
    }

}
