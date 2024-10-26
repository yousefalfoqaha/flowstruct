package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.course.CourseDTO;
import com.yousefalfoqaha.flowsheet.section.SectionDTO;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTO;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@Data
public class FlowsheetDTO {
    private UUID uuid;
    private boolean isSuggested;
    private String password;
    private StudyPlanDTO studyPlan;
    private List<SectionDTO> sectionDTOs;
    private List<SemesterDTO> semesterDTOs;
    private List<CourseDTO> courseDTOs;
}
