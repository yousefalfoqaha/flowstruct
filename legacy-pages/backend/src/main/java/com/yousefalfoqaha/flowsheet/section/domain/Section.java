package com.yousefalfoqaha.flowsheet.section.domain;

import com.yousefalfoqaha.flowsheet.program.domain.Program;
import com.yousefalfoqaha.flowsheet.school.domain.School;
import com.yousefalfoqaha.flowsheet.section.dto.request.CreateSectionRequest;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table("section")
public class Section {
    @Id
    private long id;
    private String name;
    private int requiredCreditHours;
    private SectionType type;
    private AggregateReference<School, Long> school;
    private AggregateReference<Program, Long> program;
    @MappedCollection(idColumn = "section")
    private Set<SectionCourse> courses;

    public static Section from(CreateSectionRequest request) {
        return switch (request.type()) {
            case UNIVERSITY, REMEDIAL -> Section.builder()
                    .type(request.type())
                    .build();
            case SCHOOL -> Section.builder()
                    .type(request.type())
                    .school(AggregateReference.to(request.parentId()))
                    .build();
            case PROGRAM -> Section.builder()
                    .type(request.type())
                    .program(AggregateReference.to(request.parentId()))
                    .build();
        };
    }
}