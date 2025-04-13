package com.yousefalfoqaha.gjuplans.program.mapper;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProgramResponseMapper implements Function<Program, ProgramResponse> {

    @Override
    public ProgramResponse apply(Program program) {
        return new ProgramResponse(
                program.getId(),
                program.getCode(),
                program.getName(),
                program.getDegree().name(),
                program.isPrivate()
        );
    }
}
