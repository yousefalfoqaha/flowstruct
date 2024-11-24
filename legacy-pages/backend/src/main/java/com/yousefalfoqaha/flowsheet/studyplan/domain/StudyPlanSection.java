package com.yousefalfoqaha.flowsheet.studyplan.domain;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("study_plan_section")
public class StudyPlanSection {
    AggregateReference<Section, Long> section;
}
