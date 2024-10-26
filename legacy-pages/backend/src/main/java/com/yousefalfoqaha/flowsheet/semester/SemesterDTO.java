package com.yousefalfoqaha.flowsheet.semester;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
public class SemesterDTO {
    private long id;
    private long order;
    private List<Long> mappedCourses;
}
