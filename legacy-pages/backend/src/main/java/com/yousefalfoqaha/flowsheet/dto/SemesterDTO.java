package com.yousefalfoqaha.flowsheet.dto;

import com.yousefalfoqaha.flowsheet.enums.SemesterOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Data
public class SemesterDTO {
    private long id;
    private SemesterOrder name;
    private int columnIndex;
}
