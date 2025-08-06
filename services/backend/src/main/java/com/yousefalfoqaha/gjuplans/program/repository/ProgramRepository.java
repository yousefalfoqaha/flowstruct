package com.yousefalfoqaha.gjuplans.program.repository;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    boolean existsByCodeAndDegree(String code, Degree degree);
}
