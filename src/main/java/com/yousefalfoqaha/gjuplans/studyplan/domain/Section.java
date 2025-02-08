package com.yousefalfoqaha.gjuplans.studyplan.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
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

    private SectionLevel level;

    private SectionType type;

    private int requiredCreditHours;

    private String name;

    @MappedCollection(idColumn = "section")
    Set<SectionCourse> courses;
}
