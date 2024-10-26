package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.section.SectionDTO;
import com.yousefalfoqaha.flowsheet.section.SectionDTOMapper;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTO;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
public class StudyPlanDTOMapper implements Function<StudyPlan, StudyPlanDTO> {
    private final SectionDTOMapper sectionDTOMapper;
    private final SemesterDTOMapper semesterDTOMapper;

    @Autowired
    public StudyPlanDTOMapper(SectionDTOMapper sectionDTOMapper, SemesterDTOMapper semesterDTOMapper) {
        this.sectionDTOMapper = sectionDTOMapper;
        this.semesterDTOMapper = semesterDTOMapper;
    }

    @Override
    public StudyPlanDTO apply (StudyPlan sp) {
        List<SectionDTO> sectionDTOs = sp.getSections().stream()
                .map(sectionDTOMapper)
                .toList();

        List<SemesterDTO> semesterDTOs = sp.getSemesters().stream()
                .map(semesterDTOMapper)
                .toList();

        return new StudyPlanDTO(
                sp.getId(),
                sp.getName(),
                sectionDTOs,
                semesterDTOs
        );
    }
}
