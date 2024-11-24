package com.yousefalfoqaha.flowsheet.section.validation;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.domain.SectionType;

public interface SectionValidator {
    void validate(Section section);

    static SectionValidator forType(SectionType type) {
        return switch (type) {
            case REMEDIAL, UNIVERSITY -> new TopLevelSectionValidator();
            case SCHOOL -> new SchoolSectionValidator();
            case PROGRAM -> new ProgramSectionValidator();
        };
    }
}
