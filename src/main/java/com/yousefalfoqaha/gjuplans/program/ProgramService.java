package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.request.UpdateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramResponseMapper programResponseMapper;
    private final ObjectValidator<UpdateProgramRequest> updateProgramValidator;
    private final ObjectValidator<CreateProgramRequest> createProgramValidator;

    public List<ProgramResponse> getAllPrograms() {
        return programRepository.findAllPrograms();
    }

    public ProgramResponse getProgram(long programId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException(
                        "Program with id " + programId + " was not found."
                ));

        return programResponseMapper.apply(program);
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
        program.setPrivate(request.isPrivate());

        Program updatedProgram = programRepository.save(program);
        return programResponseMapper.apply(updatedProgram);
    }

    @Transactional
    public ProgramResponse createProgram(CreateProgramRequest request) {
        createProgramValidator.validate(request);

        if (programRepository.existsByCodeIgnoreCase(request.code())) {
            throw new UniqueProgramException("Program with code " + request.code() + " already exists.");
        }

        var newProgram = new Program();

        newProgram.setCode(request.code());
        newProgram.setName(request.name());
        newProgram.setDegree(request.degree());
        newProgram.setPrivate(request.isPrivate());

        return saveAndMapProgram(newProgram, programResponseMapper);
    }

    @Transactional
    public void deleteProgram(long programId) {
        programRepository.deleteById(programId);
    }

    @Transactional
    public ProgramResponse toggleVisibility(long programId) {
        var program = findProgram(programId);

        program.setPrivate(!program.isPrivate());

        return saveAndMapProgram(program, programResponseMapper);
    }

    private Program findProgram(long programId) {
        return programRepository.findById(programId)
                .orElseThrow(
                        () -> new ProgramNotFoundException("Program with id " + programId + " was not found.")
                );
    }

    private <T> T saveAndMapProgram(Program program, Function<Program, T> mapper) {
        var savedProgram = programRepository.save(program);
        return mapper.apply(savedProgram);
    }
}
