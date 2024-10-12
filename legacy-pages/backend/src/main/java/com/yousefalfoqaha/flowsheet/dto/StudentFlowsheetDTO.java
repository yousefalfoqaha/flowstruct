package com.yousefalfoqaha.flowsheet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class StudentFlowsheetDTO {
    private long studentId;
    private StudyPlanDTO studyPlan;
    private FlowsheetDTO flowsheet;
    private List<StudentMappingDTO> studentMappings;
}
