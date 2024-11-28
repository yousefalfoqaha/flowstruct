package com.yousefalfoqaha.gjuplans.studyplan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

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

    private String name;

    @MappedCollection(idColumn = "section", keyColumn = "course")
    List<SectionCourse> courses;
}
