package com.yousefalfoqaha.gjuplans.publish.domain;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
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
@Table("publish_request_study_plan")
public class PublishRequestStudyPlan {

    private AggregateReference<StudyPlan, Long> studyPlan;
}
