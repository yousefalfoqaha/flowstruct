package com.yousefalfoqaha.gjuplans.course.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("course")
public class Course {

        @Id
        private Long id;

        private String code;

        private String name;

        private int creditHours;

        private int ects;

        private int lectureHours;

        private int practicalHours;

        private CourseType type;

        private boolean isRemedial;

        @Version
        private Long version;
}
