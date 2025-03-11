package com.yousefalfoqaha.gjuplans.studyplan.dto.request;

import java.util.List;

public record AssignCoursePrerequisitesRequest(
        List<CoursePrerequisiteRequest> prerequisites
) {
}
