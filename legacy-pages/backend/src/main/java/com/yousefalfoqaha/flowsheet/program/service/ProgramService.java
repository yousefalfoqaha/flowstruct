package com.yousefalfoqaha.flowsheet.program.service;

import com.yousefalfoqaha.flowsheet.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.flowsheet.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.flowsheet.program.repository.ProgramRepository;
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

    public List<ProgramResponse> getProgramsList() {
        return programRepository.findAll()
                .stream()
                .map(p -> new ProgramResponse(
                        p.id(),
                        p.name(),
                        p.degree().toString()
                ))
                .toList();
    }

    public ProgramResponse getProgram(Long programId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException("Program was not found"));

        return new ProgramResponse(
                program.id(),
                program.name(),
                program.degree().toString()
        );
    }

    public List<StudyPlanSummaryResponse> getProgramStudyPlans(long programId) {
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
