package com.yousefalfoqaha.flowsheet.studyplan.domain;

import com.yousefalfoqaha.flowsheet.program.domain.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

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
        private AggregateReference<Program, Long> program;
        @MappedCollection(idColumn = "study_plan")
        private Set<StudyPlanSection> sections;
}
