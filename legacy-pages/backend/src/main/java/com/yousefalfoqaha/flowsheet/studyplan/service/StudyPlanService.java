package com.yousefalfoqaha.flowsheet.studyplan.service;

import com.yousefalfoqaha.flowsheet.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.flowsheet.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.flowsheet.studyplan.repository.StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyPlanService {

    private final StudyPlanRepository studyPlanRepository;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    public StudyPlanSummaryResponse getStudyPlan(long programId, long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException(
                        "Program with id " + programId + " was not found."
                ));

        return new StudyPlanSummaryResponse(
                studyPlan.id(),
                studyPlan.name(),
                studyPlan.track(),
                studyPlan.startAcademicYear(),
                studyPlan.endAcademicYear(),
                studyPlan.sections()
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
