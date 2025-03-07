package com.yousefalfoqaha.gjuplans.course.dto.request;

import com.yousefalfoqaha.gjuplans.studyplan.domain.CourseCorequisite;
import com.yousefalfoqaha.gjuplans.studyplan.domain.CoursePrerequisite;
import com.yousefalfoqaha.gjuplans.course.domain.CourseType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record CreateCourseRequest(
        @NotEmpty(message="Code cannot be empty")
        String code,

        @NotEmpty(message="Name cannot be empty")
        String name,

        @NotNull(message="Credit hours cannot be empty")
        @Min(0)
        int creditHours,

        @NotNull(message="Credit hours cannot be empty")
        @Min(0)
        int ects,

        @NotNull(message="Lecture hours cannot be empty")
        @Min(0)
        int lectureHours,

        @NotNull(message="Practical hours cannot be empty")
        @Min(0)
        int practicalHours,

        @NotNull(message="Please choose a valid course type")
        CourseType type,

        boolean isRemedial
) {
}
