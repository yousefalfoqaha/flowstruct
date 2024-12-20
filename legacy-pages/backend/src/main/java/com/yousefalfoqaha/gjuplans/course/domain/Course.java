package com.yousefalfoqaha.gjuplans.course.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
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
        long id;

        String code;

        String name;

        int creditHours;

        int ects;

        int lectureHours;

        int practicalHours;

        CourseType type;

        boolean isRemedial;

        @MappedCollection(idColumn = "course")
        Set<CoursePrerequisite> prerequisites;

        @MappedCollection(idColumn = "course")
        Set<CourseCorequisite> corequisites;
}
