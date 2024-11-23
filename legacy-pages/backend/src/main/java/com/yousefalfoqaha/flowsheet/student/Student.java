package com.yousefalfoqaha.flowsheet.student;

import com.yousefalfoqaha.flowsheet.program.Program;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("student")
public class Student {
        @Id
        @Column("id")
        long id;
        @Column("name")
        String name;
        @Column("program")
        AggregateReference<Program, Long> program;
        @Column("study_plan")
        AggregateReference<StudyPlan, Long> studyPlan;
        @MappedCollection(idColumn = "student")
        List<PlannedCourse> plannedCourses;
}
