package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.*;
import com.yousefalfoqaha.flowsheet.repository.FlowsheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlowsheetService {

    private final FlowsheetRepository flowsheetRepository;
    private final StudyPlanService studyPlanService;
    private final StudentMappingService studentMappingService;

    @Autowired
    public FlowsheetService(
            FlowsheetRepository flowsheetRepository,
            StudyPlanService studyPlanService,
            StudentMappingService studentMappingService
    ) {
        this.flowsheetRepository = flowsheetRepository;
        this.studyPlanService = studyPlanService;
        this.studentMappingService = studentMappingService;
    }

    public FlowsheetDTO getFlowsheetByStudyPlanId(long studyPlanId) {
        return flowsheetRepository
                .findAll()
                .stream()
                .filter(f -> f.getStudyPlanId() == studyPlanId)
                .findFirst().map(f ->
                        new FlowsheetDTO(
                            f.getId(),
                            f.getSemesters()
                                    .stream()
                                    .map(s ->
                                            new SemesterDTO(
                                                  s.getId(),
                                                  s.getPosition()
                                            ))
                                    .collect(Collectors.toList())
                        ))
                .orElse(null);
    }


    public StudentFlowsheetDTO getStudentFlowsheetByStudentId(long studentId) {
        StudyPlanDTO studyPlan = studyPlanService.fetchStudyPlanFromSIS(studentId);
        FlowsheetDTO flowsheet = getFlowsheetByStudyPlanId(studyPlan.getId());
        List<StudentMappingDTO> studentMappings = studentMappingService.getStudentMappingsByStudentId(studentId);

        return new StudentFlowsheetDTO(
                studentId,
                studyPlan,
                flowsheet,
                studentMappings
        );
    }

}
