package com.yousefalfoqaha.gjuplans.program.repository;

import com.yousefalfoqaha.gjuplans.program.domain.Degree;
import com.yousefalfoqaha.gjuplans.program.domain.Program;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    @Query("SELECT * FROM program WHERE deleted_at IS NULL")
    List<Program> findAllArchived();

    @Query("SELECT COUNT(*) > 0 FROM program WHERE LOWER(code) = LOWER(:code) AND degree = :degree::degree AND deleted_at IS NULL")
    boolean existsByCodeAndDegree(String code, Degree degree);
}
