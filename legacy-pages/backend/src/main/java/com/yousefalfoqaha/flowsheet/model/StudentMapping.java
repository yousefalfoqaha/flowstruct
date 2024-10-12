package com.yousefalfoqaha.flowsheet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "student_mapping")
public class StudentMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // from SIS authentication
    @Column(name = "student_id", nullable = false)
    private long studentId;

    @Column(name = "course_id", nullable = false)
    private long courseId;

    private Semester semester;
}
