package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanSummaryProjection;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT id, year, duration, track, is_private, program " +
            "FROM study_plan"
    )
    List<StudyPlanSummaryResponse> findAllStudyPlanSummaries();

    @Query(
            "SELECT id, year, duration, track, is_private, program " +
            "FROM study_plan " +
            "WHERE id = :studyPlanId"
    )
    Optional<StudyPlanSummaryResponse> findStudyPlanSummary(long studyPlanId);

    @Query(
            "SELECT id, year, duration, track, is_private, program " +
            "FROM study_plan " +
            "WHERE program = :programId"
    )
    List<StudyPlanSummaryResponse> findAllStudyPlanSummariesByProgram(long programId);

    @Modifying
    @Query(
            "UPDATE study_plan " +
            "SET is_private = NOT is_private " +
            "WHERE id = :studyPlanId"
    )
    void toggleStudyPlanVisibility(long studyPlanId);
}
