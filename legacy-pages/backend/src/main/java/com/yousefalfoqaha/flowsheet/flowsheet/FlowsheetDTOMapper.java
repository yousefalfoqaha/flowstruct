package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.course.CourseDTO;
import com.yousefalfoqaha.flowsheet.course.CourseDTOMapper;
import com.yousefalfoqaha.flowsheet.section.Section;
import com.yousefalfoqaha.flowsheet.section.SectionDTO;
import com.yousefalfoqaha.flowsheet.section.SectionDTOMapper;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTO;
import com.yousefalfoqaha.flowsheet.semester.SemesterDTOMapper;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlan;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
public class FlowsheetDTOMapper implements Function<Flowsheet, FlowsheetDTO> {
    private final StudyPlanDTOMapper studyPlanDTOMapper;
    private final SectionDTOMapper sectionDTOMapper;
    private final SemesterDTOMapper semesterDTOMapper;
    private final CourseDTOMapper courseDTOMapper;

    @Autowired
    public FlowsheetDTOMapper(
            StudyPlanDTOMapper studyPlanDTOMapper,
            SectionDTOMapper sectionDTOMapper,
            SemesterDTOMapper semesterDTOMapper,
            CourseDTOMapper courseDTOMapper
    ) {
        this.studyPlanDTOMapper = studyPlanDTOMapper;
        this.sectionDTOMapper = sectionDTOMapper;
        this.semesterDTOMapper = semesterDTOMapper;
        this.courseDTOMapper = courseDTOMapper;
    }

    @Override
    FlowsheetDTO apply(Flowsheet f) {
        StudyPlan studyPlan = f.getStudyPlan();

        List<SectionDTO> sectionDTOs = studyPlan.getSections().stream()
                .map(sectionDTOMapper)
                .toList();

        List<SemesterDTO> semestersDTOs = studyPlan.getSemesters().stream()
                .map(semesterDTOMapper)
                .toList();
        
        List<CourseDTO> courseDTOs = sections.stream()
                .flatMap(s -> s.getCourses().stream())
                .map(courseDTOMapper)
                .toList();

        return new FlowsheetDTO(
              f.getUuid(),
              f.isSuggested(),
              f.getPassword(),
              studyPlanDTOMapper.apply(studyPlan),
              sectionDTOs,
              semestersDTOs,
              courseDTOs
        );
    }
}
