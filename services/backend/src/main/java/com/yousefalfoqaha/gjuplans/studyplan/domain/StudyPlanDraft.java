package com.yousefalfoqaha.gjuplans.studyplan.domain;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyPlanDraft {

    private int year;
    private int duration;
    private String track;
    private AggregateReference<Program, Long> program;
    private Set<Section> sections;
    private Map<Long, Placement> coursePlacements;
    private Set<CoursePrerequisite> coursePrerequisites;
    private Set<CourseCorequisite> courseCorequisites;

    public Map<Long, List<CoursePrerequisite>> coursePrerequisitesMap() {
        return coursePrerequisites
                .stream()
                .collect(Collectors.groupingBy(cp -> cp.getCourse().getId()));
    }

    public Map<Long, List<CourseCorequisite>> courseCorequisitesMap() {
        return courseCorequisites
                .stream()
                .collect(Collectors.groupingBy(cc -> cc.getCourse().getId()));
    }
}
