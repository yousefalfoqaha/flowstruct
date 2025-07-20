package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanSummaryDto;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface StudyPlanRepository extends CrudRepository<StudyPlan, Long> {

    @Query(
            "SELECT id, year, duration, track, is_published, program, created_at, updated_at, updated_by " +
                    "FROM study_plan"
    )
    List<StudyPlanSummaryDto> findAllStudyPlanSummaries();

    @Modifying
    @Query(
            "UPDATE study_plan " +
            "SET is_published = TRUE " +
            "WHERE id IN (:draftStudyPlans)"
    )
    void markAllStudyPlansPublsihed(Collection<Long> draftStudyPlans);
}
