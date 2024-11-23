package com.yousefalfoqaha.flowsheet.studyplan;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends ListCrudRepository<StudyPlan, Long> {
}
