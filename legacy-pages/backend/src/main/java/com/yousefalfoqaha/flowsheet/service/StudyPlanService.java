package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.CourseDTO;
import com.yousefalfoqaha.flowsheet.dto.SectionDTO;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudyPlanService {


    private final List<SectionDTO> sections = List.of(
            new SectionDTO(
                    1,
                    "University Requirements",
                    17
                    ),
            new SectionDTO(
                    2,
                    "School Requirements",
                    21
            ),
            new SectionDTO(
                    3,
                    "Program Requirements",
                    83
            )
    );

    private final List<CourseDTO> courses = List.of(
            new CourseDTO(
                    1,
                    "CS116",
                    "Computing Fundamentals",
                    3,
                    List.of(),
                    List.of(),
                    2
            ),
            new CourseDTO(
                    2,
                    "CS117",
                    "Object-Oriented Programming",
                    3,
                    List.of(1L),
                    List.of(),
                    2
            ),
            new CourseDTO(
                    3,
                    "CS263",
                    "Database Management Systems",
                    2,
                    List.of(2L),
                    List.of(),
                    3
            ),
            new CourseDTO(
                    4,
                    "ECE317",
                    "Linear Algebra",
                    3,
                    List.of(),
                    List.of(),
                    2
            )
    );

    private final StudyPlanDTO studyPlan = new StudyPlanDTO(
            1,
            "Computer Science 2023/2024 - General Track (New Remedials)",
            sections,
            courses
            );

    public StudyPlanDTO fetchStudyPlanFromSIS(long studentId) {
        System.out.println("Fetching study plan associated with student ID " + studentId + "...");
        return studyPlan;
    }
}
