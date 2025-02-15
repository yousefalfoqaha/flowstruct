package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanSummaryProjection;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class StudyPlanSummaryResponseMapper implements Function<StudyPlanSummaryProjection, StudyPlanSummaryResponse> {

    @Override
    public StudyPlanSummaryResponse apply(StudyPlanSummaryProjection studyPlan) {
        return new StudyPlanSummaryResponse(
                        studyPlan.id(),
                        studyPlan.year(),
                        studyPlan.duration(),
                        studyPlan.track(),
                        studyPlan.isPrivate(),
                        studyPlan.program()
                );
    }
}
