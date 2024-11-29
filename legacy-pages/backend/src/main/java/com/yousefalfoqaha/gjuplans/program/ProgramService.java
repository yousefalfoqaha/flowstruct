package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.common.ObjectValidator;
import com.yousefalfoqaha.gjuplans.program.dto.request.MakeProgramRequest;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanOptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final StudyPlanRepository studyPlanRepository;
    private final ObjectValidator<MakeProgramRequest> makeProgramRequestValidator;

    public List<ProgramOptionResponse> getProgramsList() {
        return programRepository.findAllProgramSummaries();
    }

    public List<StudyPlanOptionResponse> getProgramStudyPlans(long programId) {
        return studyPlanRepository.findAllStudyPlansByProgram(programId);
    }

    public void makeProgram(MakeProgramRequest request) {
        makeProgramRequestValidator.validate(request);
    }
}
