package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.request.UpdateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanService;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanOptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final StudyPlanService studyPlanService;
    private final ObjectValidator<UpdateProgramRequest> updateProgramValidator;

    public List<ProgramOptionResponse> getAllProgramOptions() {

        return programRepository.findAllProgramOptions()
                .stream()
                .map(o -> new ProgramOptionResponse(
                        o.getId(),
                        o.getCode(),
                        o.getName(),
                        o.getDegree().name()
                ))
                .toList();
    }

    public List<StudyPlanOptionResponse> getProgramStudyPlans(long programId) {
        return studyPlanService.getProgramStudyPlans(programId);
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

    public ProgramResponse updateProgram(UpdateProgramRequest request) {
        updateProgramValidator.validate(request);

        if (!programRepository.existsById(request.id())) {
            throw new ProgramNotFoundException("Program does not exist.");
        }

        Program updatedProgram = programRepository.save(
                new Program(
                        request.id(),
                        request.code(),
                        request.name(),
                        request.degree()
                )
        );

        return new ProgramResponse(
                updatedProgram.getId(),
                updatedProgram.getCode(),
                updatedProgram.getName(),
                updatedProgram.getDegree().name()
        );
    }
}
