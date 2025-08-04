package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT id, year, duration, track, is_pending, (approved_study_plan ->> 'version')::BIGINT AS approved_version, program, created_at, updated_at, updated_by " +
                    "FROM study_plan"
    )
    List<StudyPlanSummaryProjection> findAllStudyPlanSummaries();
}
