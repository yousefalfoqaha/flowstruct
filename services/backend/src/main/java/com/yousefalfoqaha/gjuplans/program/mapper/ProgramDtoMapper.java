package com.yousefalfoqaha.gjuplans.program.mapper;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProgramDtoMapper implements Function<Program, ProgramDto> {

    @Override
    public ProgramDto apply(Program program) {
        return new ProgramDto(
                program.getId(),
                program.getCode(),
                program.getName(),
                program.getDegree().name(),
                program.getCreatedAt(),
                program.getUpdatedAt(),
                program.getUpdatedBy(),
                program.getDeletedAt()
        );
    }
}
