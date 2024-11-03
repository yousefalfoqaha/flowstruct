package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.course.CourseDTOMapper;
import com.yousefalfoqaha.flowsheet.course.CourseService;
import com.yousefalfoqaha.flowsheet.section.SectionDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class StudyPlanDTOMapper implements Function<StudyPlan, StudyPlanDTO> {
    private final SectionDTOMapper sectionDTOMapper;

    @Autowired
    public StudyPlanDTOMapper(SectionDTOMapper sectionDTOMapper) {
        this.sectionDTOMapper = sectionDTOMapper;
    }

    @Override
    public StudyPlanDTO apply (StudyPlan sp) {
        return new StudyPlanDTO(
                sp.getId(),
                sp.getName(),
                sp.getSections().stream()
                        .map(sectionDTOMapper)
                        .toList()
        );
    }
}
