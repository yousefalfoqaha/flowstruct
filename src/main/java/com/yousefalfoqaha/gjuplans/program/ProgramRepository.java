package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.response.ProgramResponse;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    @Query("SELECT id, code, name, degree, is_private FROM program")
    List<ProgramResponse> findAllPrograms();

    boolean existsByCodeIgnoreCase(String code);
}
