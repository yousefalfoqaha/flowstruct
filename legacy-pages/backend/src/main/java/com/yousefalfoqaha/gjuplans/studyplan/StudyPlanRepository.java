package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanOptionResponse;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyPlanRepository extends ListCrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT sp.id, sp.start_academic_year, t.name AS track " +
                    "FROM study_plan sp " +
                    "JOIN track t ON sp.id = t.study_plan " +
                    "WHERE sp.program = :programId"
    )
    public List<StudyPlanOptionResponse> findAllStudyPlanOptionsByProgram(long programId);

}
