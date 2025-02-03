package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.request.UpdateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/programs")
public class ProgramController {
    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<List<ProgramOptionResponse>> getAllPrograms() {
        return new ResponseEntity<>(programService.getAllProgramOptions(), HttpStatus.OK);
    }

    @GetMapping("/{programId}/study-plans")
    public ResponseEntity<List<StudyPlanSummaryResponse>> getProgramStudyPlans(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgramStudyPlans(programId), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ProgramResponse> updateProgram(@RequestBody UpdateProgramRequest request) {
        return new ResponseEntity<>(programService.updateProgram(request), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(@RequestBody CreateProgramRequest request) {
        return new ResponseEntity<>(programService.createProgram(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{programId}")
    public ResponseEntity<Void> deleteProgram(@PathVariable long programId) {
        programService.deleteProgram(programId);
        return ResponseEntity.ok().build();
    }
}
