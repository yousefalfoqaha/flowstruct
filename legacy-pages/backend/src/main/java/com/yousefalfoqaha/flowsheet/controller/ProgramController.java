package com.yousefalfoqaha.flowsheet.controller;

import com.yousefalfoqaha.flowsheet.dto.ProgramSummaryDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanSummaryDTO;
import com.yousefalfoqaha.flowsheet.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<ProgramSummaryDTO> getPrograms() {
        return programService.getProgramsList();
    }

    @GetMapping("/{programId}/study-plans")
    public List<StudyPlanSummaryDTO> getStudyPlans(@PathVariable long programId) {
        return programService.getStudyPlansList(programId);
    }

    @GetMapping("/{programId}/study-plans/{studyPlanId}")
    public StudyPlanDTO getStudyPlan(
            @PathVariable long programId,
            @PathVariable long studyPlanId
    ) {
        return programService.getStudyPlan(programId, studyPlanId);
    }
}

