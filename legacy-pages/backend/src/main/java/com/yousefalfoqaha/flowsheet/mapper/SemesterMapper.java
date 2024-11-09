package com.yousefalfoqaha.flowsheet.mapper;

import com.yousefalfoqaha.flowsheet.dto.SemesterDTO;
import com.yousefalfoqaha.flowsheet.model.Semester;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SemesterMapper implements Function<Semester, SemesterDTO> {

    @Override
    public SemesterDTO apply(Semester s) {
        return new SemesterDTO(
                s.getId(),
                s.getName(),
                s.getColumnIndex()
        );
    }
}
