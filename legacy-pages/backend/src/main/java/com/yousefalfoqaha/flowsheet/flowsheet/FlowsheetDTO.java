package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@Data
public class FlowsheetDTO {
    private UUID uuid;
    private boolean isSuggested;
    private StudyPlanDTO studyPlan;
    private Map<Long, Integer> courseMappings;
}
