package com.yousefalfoqaha.gjuplans.program.service;

import com.yousefalfoqaha.gjuplans.common.CodeFormatter;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDetailsDto;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import com.yousefalfoqaha.gjuplans.program.mapper.ProgramDtoMapper;
import com.yousefalfoqaha.gjuplans.program.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramDtoMapper programDtoMapper;
    private final CodeFormatter codeFormatter;

    public List<ProgramDto> getAllPrograms() {
        return programRepository.findAll()
                .stream()
                .map(programDtoMapper)
                .toList();
    }

    public ProgramDto getProgram(long programId) {
        var program = findOrThrow(programId);
        return programDtoMapper.apply(program);
    }

    @Transactional
    public ProgramDto editProgramDetails(long programId, ProgramDetailsDto details) {
        Program program = findOrThrow(programId);
        String userEnteredCode = codeFormatter.apply(details.code());

        if (
                programRepository.existsByCodeAndDegree(userEnteredCode, details.degree()) &&
                        !(program.getCode().equalsIgnoreCase(userEnteredCode) && program.getDegree().equals(details.degree()))
        ) {
            throw new UniqueProgramException("Program with code " + userEnteredCode + " and degree " + details.degree() + " already exists.");
        }

        program.setCode(userEnteredCode);
        program.setName(details.name().trim());
        program.setDegree(details.degree());

        return saveAndMap(program);
    }

    @Transactional
    public ProgramDto createProgram(ProgramDetailsDto details) {
        String userEnteredCode = codeFormatter.apply(details.code());

        if (programRepository.existsByCodeAndDegree(userEnteredCode, details.degree())) {
            throw new UniqueProgramException("Program with code " + userEnteredCode + " and degree " + details.degree() + " already exists.");
        }

        var newProgram = new Program(
                null,
                userEnteredCode,
                details.name().trim(),
                details.degree(),
                null,
                null,
                null,
                null
        );

        return saveAndMap(newProgram);
    }

    @Transactional
    public void deleteProgram(long programId) {
        programRepository.deleteById(programId);
    }

    private Program findOrThrow(long programId) {
        return programRepository.findById(programId)
                .orElseThrow(
                        () -> new ProgramNotFoundException("Program with was not found.")
                );
    }

    private ProgramDto saveAndMap(Program program) {
        var savedProgram = programRepository.save(program);
        return programDtoMapper.apply(savedProgram);
    }
}
