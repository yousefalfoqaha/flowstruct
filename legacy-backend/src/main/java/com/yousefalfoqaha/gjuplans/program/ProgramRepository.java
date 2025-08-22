package com.yousefalfoqaha.gjuplans.program;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import com.yousefalfoqaha.gjuplans.program.dto.ProgramDto;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    @Query("SELECT id, code, name, degree, created_at, updated_at FROM program")
    List<ProgramDto> findAllPrograms();

    @Query("SELECT 1 FROM program WHERE code = :code AND degree = :degreeName::degree")
    boolean existsByCodeAndDegree(String code, @Param("degreeName") String degreeName);
}
