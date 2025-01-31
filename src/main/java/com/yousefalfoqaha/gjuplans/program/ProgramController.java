package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanOptionResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/programs")
@CrossOrigin("http://localhost:4321/")
public class ProgramController {
    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<List<ProgramOptionResponse>> getAllPrograms() {
        return new ResponseEntity<>(programService.getAllProgramOptions(), HttpStatus.OK);

    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanOptionResponse>> getProgramStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgramStudyPlans(programId), HttpStatus.OK);
    }
}
