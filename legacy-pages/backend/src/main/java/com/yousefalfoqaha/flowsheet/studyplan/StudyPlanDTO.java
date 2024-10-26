package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.section.SectionDTO;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTO;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class StudyPlanDTO {
    private long id;
    private String name;
}