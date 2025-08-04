package com.yousefalfoqaha.gjuplans.studyplan.callback;

import com.yousefalfoqaha.gjuplans.common.PendingResourceException;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import org.springframework.data.relational.core.conversion.MutableAggregateChange;
import org.springframework.data.relational.core.mapping.event.BeforeSaveCallback;
import org.springframework.stereotype.Component;

@Component
public class StudyPlanBeforeSaveCallback implements BeforeSaveCallback<StudyPlan> {

    @Override
    public StudyPlan onBeforeSave(StudyPlan studyPlan, MutableAggregateChange<StudyPlan> aggregateChange) {
        if (studyPlan.isPending()) {
            throw new PendingResourceException("Cannot edit a study plan while it is pending.");
        }

        return studyPlan;
    }
}
