package com.yousefalfoqaha.flowsheet.studyplan.service;

import com.yousefalfoqaha.flowsheet.course.service.CourseService;
import com.yousefalfoqaha.flowsheet.program.service.ProgramService;
import com.yousefalfoqaha.flowsheet.section.service.SectionService;
import com.yousefalfoqaha.flowsheet.studyplan.dto.response.StudyPlanDetailedResponse;
import com.yousefalfoqaha.flowsheet.studyplan.exception.StudyPlanNotFoundException;
import com.yousefalfoqaha.flowsheet.studyplan.repository.StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final ProgramService programService;
    private final SectionService sectionService;
    private final CourseService courseService;

    @Autowired
    public StudyPlanService(
            StudyPlanRepository studyPlanRepository,
            ProgramService programService,
            SectionService sectionService, CourseService courseService
    ) {
        this.studyPlanRepository = studyPlanRepository;
        this.programService = programService;
        this.sectionService = sectionService;
        this.courseService = courseService;
    }

    public StudyPlanDetailedResponse getStudyPlan(long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

        var sectionIds = studyPlan.getSections()
                .stream()
                .map(studyPlanSection -> studyPlanSection.getSection().getId())
                .toList();

        var program = programService.getProgram(studyPlan.getProgram().getId());
        var sections = sectionService.getSectionsByIds(sectionIds);

        var allCourseIds = sections.stream()
                .flatMap(section -> section.courses().stream())
                .toList();
        var allCourses = courseService.getCoursesByIds(allCourseIds);

        return new StudyPlanDetailedResponse(
                studyPlan.getId(),
                studyPlan.getTrack(),
                studyPlan.getStartAcademicYear(),
                studyPlan.getDuration(),
                program,
                sections,
                allCourses
        );
    }
}
