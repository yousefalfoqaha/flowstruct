package com.yousefalfoqaha.flowsheet.program.repository;

import com.yousefalfoqaha.flowsheet.program.domain.Program;
import com.yousefalfoqaha.flowsheet.studyplan.domain.StudyPlan;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {

    @Query("SELECT * FROM study_plan WHERE program = :programId")
    public List<StudyPlan> findAllProgramStudyPlans(long programId);
}
