package com.yousefalfoqaha.flowsheet.studyplan.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("study_plan")
public class StudyPlan {
        @Id
        private long id;
        private String track;
        private int startAcademicYear;
        private int duration;
}
