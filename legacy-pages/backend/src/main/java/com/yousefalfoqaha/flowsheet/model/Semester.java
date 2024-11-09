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
    private int columnIndex;

    private int creditHourLimit;

    @ManyToOne
    @JoinColumn(name = "study_plan_id")
    private StudyPlan studyPlan;

    public SemesterOrder getName() {
        int remainder = columnIndex % 3;
        switch (remainder) {
            case 0: {
                if (columnIndex >= 3) return SemesterOrder.Summer;
                if (columnIndex == 1) return SemesterOrder.First;
                if (columnIndex == 2) return SemesterOrder.Second;
            }
            break;
            case 1: return SemesterOrder.First;
            case 2: return SemesterOrder.Second;
        }

        throw new RuntimeException("Semester has invalid position");
    }

    public int getCreditHourLimit() {
        int remainder = columnIndex % 3;
        switch (remainder) {
            case 0: {
                if (columnIndex >= 3) return 9;
                if (columnIndex == 1) return 21;
                if (columnIndex == 2) return 21;
            }
            break;
            case 1, 2: return 21;
        }

        throw new RuntimeException("Semester has invalid position");
    }
}
