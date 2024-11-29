package com.yousefalfoqaha.gjuplans.program.service;

import com.yousefalfoqaha.gjuplans.program.ProgramRepository;
import com.yousefalfoqaha.gjuplans.program.dto.request.CreateProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.CreateProgramResponse;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanOptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final StudyPlanRepository studyPlanRepository;
    private final ProgramManagementService programManagementService;

    public List<ProgramOptionResponse> getProgramOptions() {
        return programRepository.findAllProgramOptions();
    }

    public List<StudyPlanOptionResponse> getStudyPlanOptionsByProgram(long programId) {
        return studyPlanRepository.findAllStudyPlanOptionsByProgram(programId);
    }

    public CreateProgramResponse createProgram(CreateProgramRequest request) {
        var newProgram = programManagementService.createProgram(request);
        return new CreateProgramResponse(newProgram.getId());
    }
}
