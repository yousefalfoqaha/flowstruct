package com.yousefalfoqaha.flowsheet.model;

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
import java.util.Map;

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
        @Column("study_plan_id")
        AggregateReference<StudyPlan, Long> studyPlan;
        @MappedCollection(idColumn = "student_id")
        List<PlannedCourse> plannedCourses;
}
