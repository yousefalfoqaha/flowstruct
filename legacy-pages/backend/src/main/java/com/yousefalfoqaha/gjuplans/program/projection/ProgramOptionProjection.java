package com.yousefalfoqaha.gjuplans.program.projection;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;

public record ProgramOptionProjection (
    long id,
    String code,
    String name,
    Degree degree
) {
}
