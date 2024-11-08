package com.yousefalfoqaha.flowsheet.dtomapper;

import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.model.StudyPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class StudyPlanDTOMapper implements Function<StudyPlan, StudyPlanDTO> {
    private final SectionDTOMapper sectionDTOMapper;
    private final CourseDTOMapper courseDTOMapper;

    @Autowired
    public StudyPlanDTOMapper(SectionDTOMapper sectionDTOMapper, CourseDTOMapper courseDTOMapper) {
        this.sectionDTOMapper = sectionDTOMapper;
        this.courseDTOMapper = courseDTOMapper;
    }

    @Override
    public StudyPlanDTO apply (StudyPlan sp) {
        return new StudyPlanDTO(
                sp.getId(),
                sp.getName(),
                sp.getSections()
                        .stream()
                        .map(sectionDTOMapper)
                        .toList(),
                sp.getSections()
                        .stream()
                        .flatMap(section -> section.getCourses().stream())
                        .map(courseDTOMapper)
                        .toList()
        );
    }
}
