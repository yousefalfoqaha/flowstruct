package com.yousefalfoqaha.gjuplans.program;

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
    private final ProgramDtoMapper programDtoMapper;

    public List<ProgramDto> getAllPrograms() {
        return programRepository.findAllPrograms();
    }

    public ProgramDto getProgram(long programId) {
        var program = findProgram(programId);
        return programDtoMapper.apply(program);
    }

    @Transactional
    public ProgramDto editProgramDetails(long programId, ProgramDetailsDto request) {
        Program program = findProgram(programId);

        if (
                programRepository.existsByCodeAndDegree(request.code(), request.degree().name()) &&
                        !(program.getCode().equalsIgnoreCase(request.code()) && program.getDegree().equals(request.degree()))
        ) {
            throw new UniqueProgramException("Program with code " + request.code() + " and degree " + request.degree() + " already exists.");
        }

        program.setCode(request.code());
        program.setName(request.name());
        program.setDegree(request.degree());

        Program updatedProgram = programRepository.save(program);
        return programDtoMapper.apply(updatedProgram);
    }

    @Transactional
    public ProgramDto createProgram(ProgramDetailsDto details) {
        if (programRepository.existsByCodeAndDegree(details.code(), details.degree().name())) {
            throw new UniqueProgramException("Program with code " + details.code() + " and degree " + details.degree() + " already exists.");
        }

        var newProgram = new Program(
                null,
                details.code(),
                details.name(),
                details.degree(),
                null,
                null,
                null
        );

        return saveAndMapProgram(newProgram, programDtoMapper);
    }

    @Transactional
    public void deleteProgram(long programId) {
        programRepository.deleteById(programId);
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
