package com.yousefalfoqaha.gjuplans.guide.domain;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("guide")
public class Guide {

    @Id
    private long id;

    AggregateReference<StudyPlan, Long> studyPlan;

    @MappedCollection(idColumn = "guide", keyColumn = "course")
    private Map<Long, GuideCourse> guideCourses;
}
