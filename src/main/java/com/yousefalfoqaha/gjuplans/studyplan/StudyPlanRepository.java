package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanOptionProjection;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT id, year, track, is_private, program " +
            "FROM study_plan"
    )
    List<StudyPlanOptionProjection> findAllStudyPlans();

    @Query(
            "SELECT id, year, track, is_private, program " +
            "FROM study_plan " +
            "WHERE program = :programId"
    )
    List<StudyPlanOptionProjection> findAllProgramStudyPlans(long programId);

    @Modifying
    @Query(
            "UPDATE study_plan " +
            "SET is_private = NOT is_private " +
            "WHERE id = :studyPlanId"
    )
    void toggleStudyPlanVisibility(long studyPlanId);
}
