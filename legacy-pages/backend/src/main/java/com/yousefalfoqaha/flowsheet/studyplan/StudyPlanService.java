package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.program.ProgramNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyPlanService {

    private final StudyPlanRepository studyPlanRepository;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    public StudyPlanDTO getStudyPlan(long programId, long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(programId)
                .orElseThrow(() -> new ProgramNotFoundException(
                        "Program with id " + programId + " was not found."
                ));

        return new StudyPlanDTO(
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
