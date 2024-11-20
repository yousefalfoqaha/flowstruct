package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.ProgramSummaryDTO;
import com.yousefalfoqaha.flowsheet.dto.SectionDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanSummaryDTO;
import com.yousefalfoqaha.flowsheet.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    @Autowired
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<ProgramSummaryDTO> getProgramsList() {
        return programRepository.findAll()
                .stream()
                .map(p -> new ProgramSummaryDTO(
                        p.id(),
                        p.name(),
                        p.degree().toString()
                ))
                .toList();
    }

    public List<StudyPlanSummaryDTO> getStudyPlansList(long programId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Program with id " + programId + " was not found."
                ));

        return program.studyPlans()
                .stream()
                .map(sp -> new StudyPlanSummaryDTO(
                        sp.id(),
                        sp.name(),
                        sp.startAcademicYear(),
                        sp.track()
                ))
                .toList();
    }

    public StudyPlanDTO getStudyPlan(long programId, long studyPlanId) {
        var program = programRepository.findById(programId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Program with id " + programId + " was not found."
                ));

        var studyplan = program.studyPlans()
                .stream()
                .filter(sp -> sp.id() == studyPlanId)
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(
                        "No study plan with id " + studyPlanId + " found in program"
                ));

        return new StudyPlanDTO(
                studyplan.id(),
                studyplan.name(),
                studyplan.track(),
                studyplan.startAcademicYear(),
                studyplan.endAcademicYear(),
                studyplan.sections()
                        .stream()
                        .map(sec -> new SectionDTO(
                                sec.id(),
                                sec.name(),
                                sec.requiredCreditHours(),
                                sec.courses()
                                        .stream()
                                        .map(sc -> sc.course().getId())
                                        .toList()
                        ))
                        .toList()
        );
    }
}
