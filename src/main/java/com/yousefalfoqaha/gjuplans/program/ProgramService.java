package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramResponse;
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

    public List<ProgramOptionResponse> getAllProgramOptions() {
        return programRepository.findAllProgramOptions()
                .stream()
                .map(o -> new ProgramOptionResponse(
                        o.getId(),
                        o.getCode(),
                        o.getName(),
                        o.getDegree()
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
                program.getDegree()
        );
    }
}
