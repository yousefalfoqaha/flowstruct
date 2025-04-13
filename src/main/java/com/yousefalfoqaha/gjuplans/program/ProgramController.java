package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.request.UpdateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramSummaryResponse;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
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
    public ResponseEntity<List<ProgramSummaryResponse>> getAllPrograms() {
        return new ResponseEntity<>(programService.getAllProgramOptions(), HttpStatus.OK);
    }

    @GetMapping("/{programId}")
    public ResponseEntity<ProgramResponse> getProgram(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgram(programId), HttpStatus.OK);
    }

    @PutMapping("/{programId}")
    public ResponseEntity<ProgramResponse> updateProgram(
            @PathVariable long programId,
            @RequestBody UpdateProgramRequest request
    ) {
        return new ResponseEntity<>(programService.editProgramDetails(programId, request), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(@RequestBody CreateProgramRequest request) {
        return new ResponseEntity<>(programService.createProgram(request), HttpStatus.CREATED);
    }

    @PutMapping("/{programId}/toggle-visibility")
    public ResponseEntity<ProgramResponse> toggleProgramVisibility(
            @PathVariable long programId
    ) {
        return new ResponseEntity<>(programService.toggleVisibility(programId), HttpStatus.OK);
    }

    @DeleteMapping("/{programId}")
    public ResponseEntity<Void> deleteProgram(@PathVariable long programId) {
        programService.deleteProgram(programId);
        return ResponseEntity.ok().build();
    }
}
