package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanOptionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
@CrossOrigin("http://localhost:5173/")
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public ResponseEntity<List<ProgramOptionResponse>> getPrograms() {
        return new ResponseEntity<>(programService.getProgramsList(), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanOptionResponse>> getProgramStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgramStudyPlans(programId), HttpStatus.OK);
    }
}

