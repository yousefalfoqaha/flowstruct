package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.request.UpdateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramSummaryResponse;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ObjectValidator<UpdateProgramRequest> updateProgramValidator;
    private final ObjectValidator<CreateProgramRequest> createProgramValidator;

    public List<ProgramSummaryResponse> getAllProgramOptions() {
        return programRepository.findAllProgramOptions()
                .stream()
                .map(o -> new ProgramSummaryResponse(
                        o.getId(),
                        o.getCode(),
                        o.getName(),
                        o.getDegree().name()
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
                program.getDegree().name()
        );
    }

    @Transactional
    public ProgramResponse editProgramDetails(long programId, UpdateProgramRequest request) {
        updateProgramValidator.validate(request);

        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException("Program does not exist."));


        if (programRepository.existsByCodeIgnoreCase(request.code()) && !program.getCode().equalsIgnoreCase(request.code())) {
            throw new UniqueProgramException("Program with code " + request.code() + " already exists.");
        }

        program.setCode(request.code());
        program.setName(request.name());
        program.setDegree(request.degree());

        Program updatedProgram = programRepository.save(program);

        return new ProgramResponse(
                updatedProgram.getId(),
                updatedProgram.getCode(),
                updatedProgram.getName(),
                updatedProgram.getDegree().name()
        );
    }

    @Transactional
    public ProgramResponse createProgram(CreateProgramRequest request) {
        createProgramValidator.validate(request);

        if (programRepository.existsByCodeIgnoreCase(request.code())) {
            throw new UniqueProgramException("Program with code " + request.code() + " already exists.");
        }

        Program createdProgram = programRepository.save(
                new Program(
                        null,
                        request.code(),
                        request.name(),
                        request.degree()
                )
        );

        return new ProgramResponse(
                createdProgram.getId(),
                createdProgram.getCode(),
                createdProgram.getName(),
                createdProgram.getDegree().name()
        );
    }

    @Transactional
    public void deleteProgram(long programId) {
        programRepository.deleteById(programId);
    }
}
