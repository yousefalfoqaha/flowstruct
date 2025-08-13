package com.yousefalfoqaha.gjuplans.program.service;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.mapper.ProgramDtoMapper;
import com.yousefalfoqaha.gjuplans.program.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramDtoMapper programDtoMapper;

    public List<ProgramDto> getAllPrograms(boolean archived) {
        var programs = archived
                ? programRepository.findAllArchived()
                : programRepository.findAll();

        return programs.stream()
                .map(programDtoMapper)
                .toList();
    }

    public ProgramDto getProgram(long programId) {
        var program = findOrThrow(programId);
        return programDtoMapper.apply(program);
    }

    public Program findOrThrow(long programId) {
        return programRepository.findById(programId)
                .orElseThrow(
                        () -> new ProgramNotFoundException("Program with was not found.")
                );
    }

    public ProgramDto saveAndMap(Program program) {
        var savedProgram = programRepository.save(program);
        return programDtoMapper.apply(savedProgram);
    }
}
