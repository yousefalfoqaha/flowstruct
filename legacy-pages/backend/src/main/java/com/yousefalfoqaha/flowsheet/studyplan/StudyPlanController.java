package com.yousefalfoqaha.flowsheet.studyplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studyplan")
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
