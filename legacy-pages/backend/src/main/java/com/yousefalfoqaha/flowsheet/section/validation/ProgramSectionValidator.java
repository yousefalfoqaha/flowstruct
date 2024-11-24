package com.yousefalfoqaha.flowsheet.section.validation;

import com.yousefalfoqaha.flowsheet.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.flowsheet.program.repository.ProgramRepository;
import com.yousefalfoqaha.flowsheet.section.domain.Section;
import com.yousefalfoqaha.flowsheet.section.exception.InvalidSectionException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

public class ProgramSectionValidator implements SectionValidator {
    private ProgramRepository programRepository;

    @Autowired
    public void setProgramRepository(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Override
    public void validate(Section section) {
        if (section.getProgram() == null) {
            throw new InvalidSectionException("Program section must have a program reference.");
        }
        if (!programRepository.existsById(Objects.requireNonNull(section.getProgram().getId()))) {
            throw new ProgramNotFoundException("Program not found");
        }
    }
}
