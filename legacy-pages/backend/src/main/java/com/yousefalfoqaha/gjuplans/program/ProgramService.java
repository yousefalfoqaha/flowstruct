package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanOptionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final StudyPlanRepository studyPlanRepository;

    @Autowired
    public ProgramService(ProgramRepository programRepository, StudyPlanRepository studyPlanRepository) {
        this.programRepository = programRepository;
        this.studyPlanRepository = studyPlanRepository;
    }

    public List<ProgramOptionResponse> getProgramsList() {
        return programRepository.findAllProgramSummaries();
    }

    public List<StudyPlanOptionResponse> getProgramStudyPlans(long programId) {
        return studyPlanRepository.findAllStudyPlansByProgram(programId);
    }
}
