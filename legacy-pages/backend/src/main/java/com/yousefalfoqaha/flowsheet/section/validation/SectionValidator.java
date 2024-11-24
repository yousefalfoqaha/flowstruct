package com.yousefalfoqaha.flowsheet.section.validation;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.exception.InvalidSectionException;
import org.springframework.stereotype.Service;

@Service
public class SectionValidator {
    public void validate(Section section) {
        switch (section.getType()) {
            case REMEDIAL, UNIVERSITY -> validateTopLevel(section);
            case SCHOOL -> validateSchool(section);
            case PROGRAM -> validateProgram(section);
        }
    }

    private void validateTopLevel(Section section) {
        if (section.getSchool() != null || section.getProgram() != null) {
            throw new InvalidSectionException("University and Remedial sections cannot have references.");
        }
    }

    private void validateSchool(Section section) {
        if (section.getSchool() == null) {
            throw new InvalidSectionException("School section must reference a school.");
        }
        if (section.getProgram() != null) {
            throw new InvalidSectionException("School section cannot reference a program.");
        }
    }

    private void validateProgram(Section section) {
        if (section.getProgram() == null) {
            throw new InvalidSectionException("Program section must reference a program.");
        }
        if (section.getSchool() != null) {
            throw new InvalidSectionException("Program section cannot reference a school.");
        }
    }
}