package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    @Query("SELECT id, code, name, degree FROM program")
    List<Program> findAllProgramOptions();
}
