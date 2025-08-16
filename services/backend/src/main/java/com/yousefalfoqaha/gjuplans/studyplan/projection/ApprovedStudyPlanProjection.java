package com.yousefalfoqaha.gjuplans.studyplan.projection;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;

public record ApprovedStudyPlanProjection(
        long id,
        StudyPlanDraft approvedStudyPlan
) {
}
