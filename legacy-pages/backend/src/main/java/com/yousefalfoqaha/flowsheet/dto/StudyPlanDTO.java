package com.yousefalfoqaha.flowsheet.dto;

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
    private List<CourseDTO> courses;
}
