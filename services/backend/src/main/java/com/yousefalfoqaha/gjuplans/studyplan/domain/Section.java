package com.yousefalfoqaha.gjuplans.studyplan.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("section")
public class Section {

    @Id
    private Long id;

    private SectionLevel level;

    private SectionType type;

    private int requiredCreditHours;

    private String name;

    private int position;

    @MappedCollection(idColumn = "section", keyColumn = "course")
    Map<Long, SectionCourse> courses = new HashMap<>();
}
