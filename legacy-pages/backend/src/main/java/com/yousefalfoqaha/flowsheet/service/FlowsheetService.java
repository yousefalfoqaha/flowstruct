package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.AddCoursesToFlowsheetRequest;
import com.yousefalfoqaha.flowsheet.model.Course;
import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import com.yousefalfoqaha.flowsheet.dto.FlowsheetDTO;
import com.yousefalfoqaha.flowsheet.mapper.FlowsheetMapper;
import com.yousefalfoqaha.flowsheet.model.Semester;
import com.yousefalfoqaha.flowsheet.repository.FlowsheetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FlowsheetService {
    private final FlowsheetRepository flowsheetRepository;
    private final FlowsheetMapper flowsheetMapper;
    private final StudyPlanService studyPlanService;

    @Autowired
    public FlowsheetService(
            FlowsheetRepository flowsheetRepository,
            FlowsheetMapper flowsheetMapper,
            StudyPlanService studyPlanService
    ) {
        this.flowsheetRepository = flowsheetRepository;
        this.flowsheetMapper = flowsheetMapper;
        this.studyPlanService = studyPlanService;
    }

    public FlowsheetDTO getFlowsheet(UUID flowsheetUuid) {
        Flowsheet flowsheet = flowsheetRepository
                .findById(flowsheetUuid)
                .orElseThrow(() -> new NoSuchElementException("Flowsheet not found"));

        return flowsheetMapper.apply(flowsheet);
    }

    @Transactional
    public void addCourses(AddCoursesToFlowsheetRequest request, UUID flowsheetUuid) {
        var flowsheet = flowsheetRepository
                .findById(flowsheetUuid)
                .orElseThrow(() -> new NoSuchElementException("Flowsheet not found"));

        var semester = flowsheet.getStudyPlan().getSemesters()
                .stream()
                .filter(sem -> sem.getId() == request.semesterId())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        var mappedCourses = flowsheet.getCourseMappings();

        var studyPlanCourses = studyPlanService.getStudyPlanCourses(
                flowsheet.getStudyPlan().getId(),
                request.courseIds()
        );

        checkSemesterCreditHourLimit(semester, mappedCourses, studyPlanCourses);
        checkPrerequisiteOrder(semester, mappedCourses, studyPlanCourses);
    }

    public void checkSemesterCreditHourLimit(
            Semester semester,
            Map<Course, Semester> mappedCourses,
            List<Course> toBeAddedCourses
    ) {
        int totalSemesterCreditHours = mappedCourses.entrySet()
                .stream()
                .filter(c -> c.getValue().getId() == semester.getId())
                .mapToInt(c -> c.getKey().getCreditHours())
                .sum();

        int creditHoursToBeAdded = toBeAddedCourses
                .stream()
                .mapToInt(Course::getCreditHours)
                .sum();

        if (creditHoursToBeAdded + totalSemesterCreditHours > semester.getCreditHourLimit()) {
            throw new RuntimeException("Cannot add more courses than the credit hour limit of this semester");
        }
    }

    public void checkPrerequisiteOrder(
            Semester semester,
            Map<Course, Semester> mappedCourses,
            List<Course> toBeAddedCourses
    ) {
        toBeAddedCourses.forEach(course -> {
            if (mappedCourses.containsKey(course)) {
                throw new RuntimeException("Course already mapped");
            }

            course.getPrerequisites().forEach(prerequisite -> {
                if (mappedCourses.get(prerequisite).getColumnIndex() >= semester.getColumnIndex()) {
                    throw new RuntimeException("Course cannot be taken before its pre-requisite");
                };
            });
        });
    }
}
