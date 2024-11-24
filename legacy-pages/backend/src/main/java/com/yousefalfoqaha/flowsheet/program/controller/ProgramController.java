package com.yousefalfoqaha.flowsheet.program.controller;

import com.yousefalfoqaha.flowsheet.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.flowsheet.program.service.ProgramService;
import com.yousefalfoqaha.flowsheet.studyplan.dto.response.StudyPlanSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<ProgramResponse>> getPrograms() {
        return new ResponseEntity<>(programService.getProgramsList(), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanSummaryResponse>> getProgramStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgramStudyPlans(programId), HttpStatus.OK);
    }
}

