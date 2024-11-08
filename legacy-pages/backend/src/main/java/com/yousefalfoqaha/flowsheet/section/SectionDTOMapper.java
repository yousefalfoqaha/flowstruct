package com.yousefalfoqaha.flowsheet.section;

import com.yousefalfoqaha.flowsheet.course.Course;
import com.yousefalfoqaha.flowsheet.course.CourseDTOMapper;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class SectionDTOMapper implements Function<Section, SectionDTO> {
    private final CourseDTOMapper courseDTOMapper;

    public SectionDTOMapper(CourseDTOMapper courseDTOMapper) {
        this.courseDTOMapper = courseDTOMapper;
    }

    @Override
    public SectionDTO apply(Section s) {
        return new SectionDTO(
                s.getId(),
                s.getName(),
                s.getRequiredCreditHours(),

        );
    }
}