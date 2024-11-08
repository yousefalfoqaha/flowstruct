package com.yousefalfoqaha.flowsheet.repository;

import com.yousefalfoqaha.flowsheet.model.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {
}
