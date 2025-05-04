package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDetailsDto;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
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
    private final ObjectValidator<ProgramDetailsDto> updateProgramValidator;
    private final ObjectValidator<ProgramDetailsDto> programDetailsValidator;

    public List<ProgramDto> getAllPrograms() {
        return programRepository.findAllPrograms();
    }

    public ProgramDto getProgram(long programId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException(
                        "Program with id " + programId + " was not found."
                ));

        return programResponseMapper.apply(program);
    }

    @Transactional
    public ProgramDto editProgramDetails(long programId, ProgramDetailsDto request) {
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
    public ProgramDto createProgram(ProgramDetailsDto details) {
        programDetailsValidator.validate(details);

        if (programRepository.existsByCodeIgnoreCase(details.code())) {
            throw new UniqueProgramException("Program with code " + details.code() + " already exists.");
        }

        var newProgram = new Program();

        newProgram.setCode(details.code());
        newProgram.setName(details.name());
        newProgram.setDegree(details.degree());
        newProgram.setPrivate(details.isPrivate());

        return saveAndMapProgram(newProgram, programResponseMapper);
    }

    @Transactional
    public void deleteProgram(long programId) {
        programRepository.deleteById(programId);
    }

    @Transactional
    public ProgramDto toggleVisibility(long programId) {
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
