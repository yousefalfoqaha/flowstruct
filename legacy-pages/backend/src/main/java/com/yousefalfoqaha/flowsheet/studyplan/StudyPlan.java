package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.section.Section;
import com.yousefalfoqaha.flowsheet.semester.Semester;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "study_plan")
public class StudyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "studyPlan")
    private List<Section> sections;

    @OneToMany(mappedBy = "studyPlan")
    private List<Semester> semesters;

    @Column(nullable = false)
    private int years;
}
