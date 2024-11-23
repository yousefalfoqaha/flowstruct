package com.yousefalfoqaha.flowsheet.program;

import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanSummaryDTO;
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
    public ResponseEntity<List<ProgramSummaryDTO>> getPrograms() {
        return new ResponseEntity<>(programService.getProgramsList(), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanSummaryDTO>> getStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getStudyPlansList(programId), HttpStatus.OK);
    }
}

