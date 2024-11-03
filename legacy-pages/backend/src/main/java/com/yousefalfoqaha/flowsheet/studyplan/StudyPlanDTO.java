package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.course.CourseDTO;
import com.yousefalfoqaha.flowsheet.section.SectionDTO;
import lombok.*;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class StudyPlanDTO {
    private long id;
    private String name;
    private List<SectionDTO> sections;
}