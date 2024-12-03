package com.yousefalfoqaha.gjuplans.guide;

import com.yousefalfoqaha.gjuplans.guide.domain.Guide;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuideRepository extends ListCrudRepository<Guide, Long> {

    @Query("SELECT * FROM guide WHERE study_plan = :studyPlanId")
    Optional<Guide> findGuideByStudyPlan(long studyPlanId);
}
