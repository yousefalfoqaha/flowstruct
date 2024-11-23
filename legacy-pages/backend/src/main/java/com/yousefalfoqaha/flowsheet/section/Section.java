package com.yousefalfoqaha.flowsheet.section;

import com.yousefalfoqaha.flowsheet.program.Program;
import com.yousefalfoqaha.flowsheet.school.School;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("section")
public class Section {
    @Id
    private long id;
    private String name;
    private int requiredCreditHours;
    private SectionType type;
    private AggregateReference<School, Long> school;
    private AggregateReference<Program, Long> program;

    @MappedCollection(idColumn = "section_id")
    private Set<SectionCourse> courses;
}