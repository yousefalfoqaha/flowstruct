package com.yousefalfoqaha.flowsheet.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class CourseDTO {
    private long id;
    private String code;
    private String name;
    private int creditHours;
    private List<Long> prerequisiteIds;
}
