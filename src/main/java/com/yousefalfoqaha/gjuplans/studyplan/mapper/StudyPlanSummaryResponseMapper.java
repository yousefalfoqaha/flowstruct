package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanSummaryDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class StudyPlanSummaryResponseMapper implements Function<StudyPlan, StudyPlanSummaryDto> {

    @Override
    public StudyPlanSummaryDto apply(StudyPlan studyPlan) {
        return new StudyPlanSummaryDto(
                        studyPlan.getId(),
                        studyPlan.getYear(),
                        studyPlan.getDuration(),
                        studyPlan.getTrack(),
                        studyPlan.isPrivate(),
                        studyPlan.getProgram().getId()
                );
    }
}
