package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanOptionProjection;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT sp.id, sp.start_academic_year, t.code AS track_code, t.name AS track_name, sp.program " +
            "FROM study_plan sp " +
            "LEFT JOIN track t ON sp.id = t.study_plan;"
    )
    List<StudyPlanOptionProjection> findAllStudyPlanOptions();
}
