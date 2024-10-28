package com.yousefalfoqaha.flowsheet.section;

import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class SectionDTOMapper implements Function<Section, SectionDTO> {

    @Override
    public SectionDTO apply(Section s) {
        return new SectionDTO(
                s.getId(),
                s.getName(),
                s.getRequiredCreditHours(),
                s.getCourses().stream()
                        .map(Course::getId)
                        .toList()
        );
    }
}