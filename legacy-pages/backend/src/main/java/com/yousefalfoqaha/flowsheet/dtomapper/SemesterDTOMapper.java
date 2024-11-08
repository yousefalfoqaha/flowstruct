package com.yousefalfoqaha.flowsheet.dtomapper;

import com.yousefalfoqaha.flowsheet.dto.SemesterDTO;
import com.yousefalfoqaha.flowsheet.model.Semester;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SemesterDTOMapper implements Function<Semester, SemesterDTO> {

    @Override
    public SemesterDTO apply(Semester s) {
        return new SemesterDTO(
                s.getId(),
                s.getName(),
                s.getColumnIndex()
        );
    }
}
