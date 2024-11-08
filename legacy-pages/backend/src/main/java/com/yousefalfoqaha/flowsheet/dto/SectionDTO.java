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
public class SectionDTO {
    private long id;
    private String name;
    private int requiredCreditHours;
    private List<Long> courseIds;
}
