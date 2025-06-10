package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.ProgramDetailsDto;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<ProgramDto>> getAllPrograms() {
        return new ResponseEntity<>(programService.getAllPrograms(), HttpStatus.OK);
    }

    @GetMapping("/{programId}")
    public ResponseEntity<ProgramDto> getProgram(@PathVariable long programId) {
        return new ResponseEntity<>(programService.getProgram(programId), HttpStatus.OK);
    }

    @PutMapping("/{programId}")
    public ResponseEntity<ProgramDto> updateProgram(
            @PathVariable long programId,
            @Valid @RequestBody ProgramDetailsDto request
    ) {
        return new ResponseEntity<>(programService.editProgramDetails(programId, request), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProgramDto> createProgram(@Valid @RequestBody ProgramDetailsDto programDetails) {
        return new ResponseEntity<>(programService.createProgram(programDetails), HttpStatus.CREATED);
    }

    @DeleteMapping("/{programId}")
    public ResponseEntity<Void> deleteProgram(@PathVariable long programId) {
        programService.deleteProgram(programId);
        return ResponseEntity.noContent().build();
    }
}
