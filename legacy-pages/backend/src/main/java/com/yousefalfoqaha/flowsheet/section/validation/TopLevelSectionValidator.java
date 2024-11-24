package com.yousefalfoqaha.flowsheet.section.validation;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.exception.InvalidSectionException;

public class TopLevelSectionValidator implements SectionValidator {
    @Override
    public void validate(Section section) {
        if (section.getSchool() != null || section.getProgram() != null) {
            throw new InvalidSectionException("University and Remedial sections cannot have references.");
        }
    }
}
