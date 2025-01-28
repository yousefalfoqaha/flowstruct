package com.yousefalfoqaha.gjuplans.course.dto.response;

public record CourseWithSequencesResponse(
        CourseResponse course,
        CourseSequencesResponse sequences
) {
}
