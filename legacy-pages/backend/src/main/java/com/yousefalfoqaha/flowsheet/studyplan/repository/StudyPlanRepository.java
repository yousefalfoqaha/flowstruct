package com.yousefalfoqaha.flowsheet.studyplan.repository;

import com.yousefalfoqaha.flowsheet.studyplan.domain.StudyPlan;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends ListCrudRepository<StudyPlan, Long> {
}
