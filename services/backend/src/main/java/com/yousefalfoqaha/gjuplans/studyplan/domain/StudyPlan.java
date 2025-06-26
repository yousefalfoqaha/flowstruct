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

    private boolean isPublished;

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
    private Map<Long, CoursePlacement> coursePlacements = new HashMap<>();

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
}
