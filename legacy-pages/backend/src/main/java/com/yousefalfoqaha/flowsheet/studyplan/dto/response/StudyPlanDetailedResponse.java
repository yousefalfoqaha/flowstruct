package com.yousefalfoqaha.flowsheet.studyplan.dto.response;

import com.yousefalfoqaha.flowsheet.course.dto.response.CourseResponse;
import com.yousefalfoqaha.flowsheet.program.dto.response.ProgramResponse;
import com.yousefalfoqaha.flowsheet.section.dto.response.SectionResponse;

import java.util.List;

public record StudyPlanDetailedResponse(
        long id,
        String track,
        int startAcademicYear,
        int duration,
        ProgramResponse program,
        List<SectionResponse> sections,
        List<CourseResponse> allCourses
) {
}
