package com.yousefalfoqaha.gjuplans.studyplan.repository;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanSummaryProjection;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {
    String studyPlanSummariesQuery =
            "SELECT id, year, duration, track, (approved_study_plan ->> 'version')::BIGINT AS approved_version, version, program, created_at, updated_at, updated_by, deleted_at " +
                    "FROM study_plan";


    @Query(studyPlanSummariesQuery + " WHERE deleted_at IS NOT NULL")
    List<StudyPlanSummaryProjection> findAllArchivedStudyPlanSummaries();

    @Query(studyPlanSummariesQuery)
    List<StudyPlanSummaryProjection> findAllStudyPlanSummaries();

    @Query("SELECT id FROM study_plan WHERE program = :programId")
    List<Long> findAllStudyPlanIdsByProgram(long programId);

    @Query(studyPlanSummariesQuery + " WHERE id = (:studyPlanId)")
    Optional<StudyPlanSummaryProjection> findStudyPlanSummary(long studyPlanId);
}
