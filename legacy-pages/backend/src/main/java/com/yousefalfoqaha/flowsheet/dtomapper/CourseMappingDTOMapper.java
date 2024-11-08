package com.yousefalfoqaha.flowsheet.dtomapper;

import com.yousefalfoqaha.flowsheet.dto.CourseMappingDTO;
import com.yousefalfoqaha.flowsheet.model.CourseMapping;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CourseMappingDTOMapper implements Function<CourseMapping, CourseMappingDTO> {

    @Override
    public CourseMappingDTO apply(CourseMapping cm) {
        return new CourseMappingDTO(
                cm.getSemester().getId(),
                cm.getRowIndex()
        );
    }
}
