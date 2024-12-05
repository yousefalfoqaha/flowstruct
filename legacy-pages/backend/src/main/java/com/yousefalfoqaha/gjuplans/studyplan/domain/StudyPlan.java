package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("study_plan")
public class StudyPlan {

        @Id
        private long id;

        private int startAcademicYear;

        private int duration;

        private Track track;

        private AggregateReference<Program, Long> program;

        @MappedCollection(idColumn = "study_plan", keyColumn = "id")
        private List<Section> sections;

        @MappedCollection(idColumn = "study_plan", keyColumn = "course")
        private Map<Long, GuideCourse> guideCourses;
}
