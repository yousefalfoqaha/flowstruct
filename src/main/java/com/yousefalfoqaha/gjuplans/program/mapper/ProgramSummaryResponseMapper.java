package com.yousefalfoqaha.gjuplans.program.mapper;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProgramSummaryResponseMapper implements Function<Program, ProgramSummaryResponse> {

    @Override
    public ProgramSummaryResponse apply(Program program) {
        return new ProgramSummaryResponse(
                program.getId(),
                program.getCode(),
                program.getName(),
                program.getDegree().name(),
                program.isPrivate()
        );
    }
}
