package com.yousefalfoqaha.flowsheet.program.service;

import com.yousefalfoqaha.flowsheet.program.repository.ProgramRepository;
import com.yousefalfoqaha.flowsheet.program.dto.response.ProgramSummaryResponse;
import com.yousefalfoqaha.flowsheet.studyplan.dto.response.StudyPlanSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    @Autowired
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<ProgramSummaryResponse> getProgramsList() {
        return programRepository.findAll()
                .stream()
                .map(p -> new ProgramSummaryResponse(
                        p.id(),
                        p.name(),
                        p.degree().toString()
                ))
                .toList();
    }

    public List<StudyPlanSummaryResponse> getStudyPlansList(long programId) {
        return programRepository.findAllProgramStudyPlans(programId)
                .stream()
                .map(sp -> new StudyPlanSummaryResponse(
                        sp.getId(),
                        sp.getTrack(),
                        sp.getStartAcademicYear()
                ))
                .toList();
    }
}
