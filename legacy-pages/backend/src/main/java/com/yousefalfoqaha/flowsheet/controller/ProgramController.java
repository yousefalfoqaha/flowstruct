package com.yousefalfoqaha.flowsheet.controller;

import com.yousefalfoqaha.flowsheet.dto.ProgramSummaryDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanSummaryDTO;
import com.yousefalfoqaha.flowsheet.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<ProgramSummaryDTO>> getPrograms() {
        return new ResponseEntity<>(programService.getProgramsList(), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanSummaryDTO>> getStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getStudyPlansList(programId), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans/{studyPlanId}")
    public ResponseEntity<StudyPlanDTO> getStudyPlan(@PathVariable long programId, @PathVariable long studyPlanId) {
        return new ResponseEntity<>(programService.getStudyPlan(programId, studyPlanId), HttpStatus.OK);
    }
}

