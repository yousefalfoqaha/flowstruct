package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.*;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("study_plan")
public class StudyPlan {

    @Id
    private Long id;

    private int year;

    private int duration;

    private String track;

    private String draft;

    private AggregateReference<Program, Long> program;

    @Version
    private Long version;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @LastModifiedBy
    private Long updatedBy;

    @MappedCollection(idColumn = "study_plan")
    private Set<Section> sections = new HashSet<>();

    @MappedCollection(idColumn = "study_plan", keyColumn = "course")
    private Map<Long, Placement> coursePlacements = new HashMap<>();

    @MappedCollection(idColumn = "study_plan")
    private Set<CoursePrerequisite> coursePrerequisites = new HashSet<>();

    @MappedCollection(idColumn = "study_plan")
    private Set<CourseCorequisite> courseCorequisites = new HashSet<>();

    public Map<Long, List<CoursePrerequisite>> getCoursePrerequisitesMap() {
        return coursePrerequisites
                .stream()
                .collect(Collectors.groupingBy(coursePrerequisite -> coursePrerequisite.getCourse().getId()));
    }

    public Map<Long, List<CourseCorequisite>> getCourseCorequisitesMap() {
        return courseCorequisites
                .stream()
                .collect(Collectors.groupingBy(courseCorequisite -> courseCorequisite.getCourse().getId()));
    }

    public StudyPlan(
            Long id,
            int year,
            int duration,
            String track,
            AggregateReference<Program, Long> program,
            Set<Section> sections,
            Map<Long, Placement> coursePlacements,
            Set<CoursePrerequisite> coursePrerequisites,
            Set<CourseCorequisite> courseCorequisites
    ) {
        this.id = id;
        this.year = year;
        this.duration = duration;
        this.track = track;
        this.program = program;
        this.sections = sections;
        this.coursePlacements = coursePlacements;
        this.coursePrerequisites = coursePrerequisites;
        this.courseCorequisites = courseCorequisites;
    }
}
