package com.yousefalfoqaha.flowsheet.mapper;

import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.model.StudyPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class StudyPlanMapper implements Function<StudyPlan, StudyPlanDTO> {
    private final SectionMapper sectionMapper;
    private final CourseMapper courseMapper;

    @Autowired
    public StudyPlanMapper(SectionMapper sectionMapper, CourseMapper courseMapper) {
        this.sectionMapper = sectionMapper;
        this.courseMapper = courseMapper;
    }

    @Override
    public StudyPlanDTO apply (StudyPlan sp) {
        return new StudyPlanDTO(
                sp.getId(),
                sp.getName(),
                sp.getSections()
                        .stream()
                        .map(sectionMapper)
                        .toList(),
                sp.getSections()
                        .stream()
                        .flatMap(section -> section.getCourses().stream())
                        .map(courseMapper)
                        .toList()
        );
    }
}
