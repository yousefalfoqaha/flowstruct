package com.yousefalfoqaha.flowsheet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "flowsheet")
public class Flowsheet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private String password;

    @ManyToOne
    @JoinColumn(name = "study_plan_id")
    private StudyPlan studyPlan;

    @OneToMany(mappedBy = "flowsheet")
    private List<CourseMapping> courseMappings;
}
