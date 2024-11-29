package com.yousefalfoqaha.gjuplans.program.service;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.ProgramRepository;
import com.yousefalfoqaha.gjuplans.program.domain.Degree;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.exception.InvalidDegreeException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@RequiredArgsConstructor
@Service
public class ProgramManagementService {
    private final ProgramRepository programRepository;
    private final ObjectValidator<CreateProgramRequest> createProgramRequestValidator;

    public Program createProgram(CreateProgramRequest request) {
        createProgramRequestValidator.validate(request);

        Degree degree = Arrays.stream(Degree.values())
                .filter(d -> d.toString().equalsIgnoreCase(request.degree()))
                .findFirst()
                .orElseThrow(
                        () -> new InvalidDegreeException("Degree is not offered by the university.")
                );

        if (programRepository.existsByNameAndDegree(request.name(), request.degree())) {
            throw new UniqueProgramException("A program with the same name and degree already exists.");
        }

        return programRepository.save(
                new Program(
                        null,
                        request.name(),
                        degree.toString()
                ));
    }
}
