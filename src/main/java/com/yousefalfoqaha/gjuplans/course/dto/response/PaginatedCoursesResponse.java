package com.yousefalfoqaha.gjuplans.course.dto.response;

import java.util.List;

public record PaginatedCoursesResponse(
        List<CourseResponse> content,
        int page,
        int size,
        long totalCourses,
        int totalPages,
        boolean isLastPage
) {
}
