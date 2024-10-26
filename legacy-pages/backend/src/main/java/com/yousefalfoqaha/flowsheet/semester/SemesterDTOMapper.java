package com.yousefalfoqaha.flowsheet.semester;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SemesterDTOMapper implements Function<Semester, SemesterDTO> {

    @Override
    public SemesterDTO apply(Semester s) {
        return new SemesterDTO(
                s.getId(),
                s.getOrder(),
                s.get
        );
    }
}
