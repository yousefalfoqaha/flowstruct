package com.yousefalfoqaha.flowsheet.model;

import com.yousefalfoqaha.flowsheet.enums.DegreeType;
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
    private DegreeType degree;

    @Column(nullable = false)
    private String major;

    @Column(nullable = false)
    private int academicYear;

    private String track;

    @OneToMany(mappedBy = "studyPlan", cascade = CascadeType.ALL)
    private List<Section> sections;

    @OneToMany(mappedBy = "studyPlan", cascade = CascadeType.ALL)
    private List<Semester> semesters;
}
