package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class StudyPlanSummaryResponseMapper implements Function<StudyPlan, StudyPlanSummaryResponse> {

    @Override
    public StudyPlanSummaryResponse apply(StudyPlan studyPlan) {
        return new StudyPlanSummaryResponse(
                        studyPlan.getId(),
                        studyPlan.getYear(),
                        studyPlan.getDuration(),
                        studyPlan.getTrack(),
                        studyPlan.isPrivate(),
                        studyPlan.getProgram().getId()
                );
    }
}
