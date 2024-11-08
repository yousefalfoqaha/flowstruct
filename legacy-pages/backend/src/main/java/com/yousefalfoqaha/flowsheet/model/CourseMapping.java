package com.yousefalfoqaha.flowsheet.model;

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
@Table(name = "course_mapping")
public class CourseMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "flowsheet_uuid")
    private Flowsheet flowsheet;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "semester_id")
    private Semester semester;
}
