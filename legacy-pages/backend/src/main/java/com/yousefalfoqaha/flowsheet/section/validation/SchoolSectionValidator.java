package com.yousefalfoqaha.flowsheet.section.validation;

import com.yousefalfoqaha.flowsheet.school.SchoolNotFoundException;
import com.yousefalfoqaha.flowsheet.school.SchoolRepository;
import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.exception.InvalidSectionException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

public class SchoolSectionValidator implements SectionValidator {
    private SchoolRepository schoolRepository;

    @Autowired
    public void setSchoolRepository(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Override
    public void validate(Section section) {
        if (section.getSchool() == null) {
            throw new InvalidSectionException("School section must have a school reference.");
        }
        if (!schoolRepository.existsById(Objects.requireNonNull(section.getSchool().getId()))) {
            throw new SchoolNotFoundException("School not found");
        }
    }
}
