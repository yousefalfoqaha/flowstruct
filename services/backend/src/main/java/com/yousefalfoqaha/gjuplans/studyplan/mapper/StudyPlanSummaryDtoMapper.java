package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanSummaryDto;
import com.yousefalfoqaha.gjuplans.studyplan.projection.StudyPlanSummaryProjection;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.function.Function;

@Service
public class StudyPlanSummaryDtoMapper implements Function<StudyPlanSummaryProjection, StudyPlanSummaryDto> {

    @Override
    public StudyPlanSummaryDto apply(StudyPlanSummaryProjection studyPlan) {
        String status = studyPlan.approvedVersion() == null
                ? "NEW"
                : !Objects.equals(studyPlan.approvedVersion(), studyPlan.version())
                ? "DRAFT"
                : "APPROVED";

        return new StudyPlanSummaryDto(
                studyPlan.id(),
                studyPlan.year(),
                studyPlan.duration(),
                studyPlan.track(),
                status,
                studyPlan.program(),
                studyPlan.createdAt(),
                studyPlan.updatedAt(),
                studyPlan.updatedBy()
        );
    }
}
