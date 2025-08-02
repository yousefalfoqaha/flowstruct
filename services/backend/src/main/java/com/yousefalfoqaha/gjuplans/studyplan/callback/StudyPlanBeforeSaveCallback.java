package com.yousefalfoqaha.gjuplans.studyplan.callback;

import com.yousefalfoqaha.gjuplans.common.PendingResourceException;
import com.yousefalfoqaha.gjuplans.common.PublishStatus;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;
import org.springframework.data.relational.core.conversion.MutableAggregateChange;
import org.springframework.data.relational.core.mapping.event.BeforeSaveCallback;
import org.springframework.stereotype.Component;

@Component
public class StudyPlanBeforeSaveCallback implements BeforeSaveCallback<StudyPlan> {

    // TODO: publish history query to figure out last publish (if success or pending)
    @Override
    public StudyPlan onBeforeSave(StudyPlan studyPlan, MutableAggregateChange<StudyPlan> aggregateChange) {
        if (studyPlan.getStatus() == PublishStatus.PENDING) {
            throw new PendingResourceException("Cannot edit a resource while it is pending.");
        }

        StudyPlanDraft currentDraft = studyPlan.getDraft();

        StudyPlanDraft lastPublishedDraft = new StudyPlanDraft(
                studyPlan.getYear(),
                studyPlan.getDuration(),
                studyPlan.getTrack(),
                studyPlan.getProgram(),
                studyPlan.getSections(),
                studyPlan.getCoursePlacements(),
                studyPlan.getCoursePrerequisites(),
                studyPlan.getCourseCorequisites()
        );

        if (!currentDraft.equals(lastPublishedDraft)) {
            studyPlan.setStatus(PublishStatus.DRAFT);
        } else {
            studyPlan.setDraft(null);
        }

        return studyPlan;
    }
}
