package com.yousefalfoqaha.flowsheet.coursemapping;


import com.yousefalfoqaha.flowsheet.course.Course;
import com.yousefalfoqaha.flowsheet.flowsheet.Flowsheet;
import com.yousefalfoqaha.flowsheet.semester.Semester;
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
    @JoinColumn(name = "flowsheet_id")
    private Flowsheet flowsheet;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;
}
