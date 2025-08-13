package com.yousefalfoqaha.gjuplans.program.service;

import com.yousefalfoqaha.gjuplans.common.CodeFormatter;
import java.time.Instant;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDetailsDto;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import com.yousefalfoqaha.gjuplans.program.repository.ProgramRepository;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@PreAuthorize("hasRole('ROLE_EDITOR')")
@RequiredArgsConstructor
@Service
public class ProgramManagerService {
    private final StudyPlanManagerService studyPlanManagerService;
    private final ProgramService programService;
    private final ProgramRepository programRepository;
    private final CodeFormatter codeFormatter;

    @Transactional
    public ProgramDto editProgramDetails(long programId, ProgramDetailsDto details) {
        Program program = programService.findOrThrow(programId);
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

        return programService.saveAndMap(program);
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
                null,
                null
        );

        return programService.saveAndMap(newProgram);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    public void deleteProgram(long programId) {
        studyPlanManagerService.deleteStudyPlansByProgram(programId);

        programRepository.deleteById(programId);
    }

    @Transactional
    public ProgramDto archiveProgram(long programId) {
        Program program = programService.findOrThrow(programId);
        program.setDeletedAt(Instant.now());
        return programService.saveAndMap(program);
    }

    @Transactional
    public ProgramDto unarchiveProgram(long programId) {
        Program program = programService.findOrThrow(programId);
        program.setDeletedAt(null);
        return programService.saveAndMap(program);
    }
}
