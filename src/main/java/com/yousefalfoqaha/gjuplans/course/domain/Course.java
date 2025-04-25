package com.yousefalfoqaha.gjuplans.course.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

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
        private long version;
}
