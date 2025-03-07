package com.yousefalfoqaha.gjuplans.studyplan.dto.response;

import java.util.List;

public record SectionCourseResponse(
        List<CoursePrerequisiteResponse> prerequisites,
        List<Long> corequisites
) {
}
