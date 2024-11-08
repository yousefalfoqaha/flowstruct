package com.yousefalfoqaha.flowsheet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@Data
public class FlowsheetDTO {
    private UUID uuid;
    private String name;
    private List<SemesterDTO> semesters;
    private Map<Long, CourseMappingDTO> courseMappings;
    private List<CourseDTO> courses;
}
