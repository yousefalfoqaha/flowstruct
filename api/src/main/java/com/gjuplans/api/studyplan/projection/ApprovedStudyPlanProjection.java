package com.gjuplans.api.studyplan.projection;

import com.gjuplans.api.studyplan.domain.StudyPlanDraft;

public record ApprovedStudyPlanProjection(
        long id,
        StudyPlanDraft approvedStudyPlan
) {
}
