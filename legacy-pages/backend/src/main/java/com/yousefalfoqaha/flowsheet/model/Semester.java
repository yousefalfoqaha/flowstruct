package com.yousefalfoqaha.flowsheet.model;

import com.yousefalfoqaha.flowsheet.enums.SemesterOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "semester")
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private SemesterOrder name;

    @Column(nullable = false)
    private int columnIndex;

    @ManyToOne
    @JoinColumn(name = "study_plan_id")
    private StudyPlan studyPlan;

    public SemesterOrder getName() {
        int remainder = columnIndex % 3;
        switch (remainder) {
            case 0: {
                if (columnIndex >= 3) return SemesterOrder.SUMMER;
                if (columnIndex == 1) return SemesterOrder.FIRST;
                if (columnIndex == 2) return SemesterOrder.SECOND;
            }
            break;
            case 1: return SemesterOrder.FIRST;
            case 2: return SemesterOrder.SECOND;
        }

        throw new RuntimeException("Semester has invalid position");
    }
}
