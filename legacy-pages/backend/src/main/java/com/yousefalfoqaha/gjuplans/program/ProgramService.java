package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramResponse;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    public List<ProgramOptionResponse> getAllProgramOptions() {
        return programRepository.findAllProgramOptions()
                .stream()
                .map(o -> new ProgramOptionResponse(
                        o.id(),
                        o.code(),
                        o.name(),
                        o.degree()
                ))
                .toList();
    }

    public ProgramResponse getProgram(long programId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException(
                        "Program with id " + programId + " was not found."
                ));

        return new ProgramResponse(
                program.getId(),
                program.getCode(),
                program.getName(),
                program.getDegree()
        );
    }
}
