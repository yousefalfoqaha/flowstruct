package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CourseDtoMapper implements Function<Course, CourseDto> {

    @Override
    public CourseDto apply(Course course) {
        return new CourseDto(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getCreditHours(),
                course.getEcts(),
                course.getLectureHours(),
                course.getPracticalHours(),
                course.getType(),
                course.isRemedial(),
                course.isArchived(),
                course.getCreatedAt(),
                course.getUpdatedAt(),
                course.getUpdatedBy()
        );
    }
}
