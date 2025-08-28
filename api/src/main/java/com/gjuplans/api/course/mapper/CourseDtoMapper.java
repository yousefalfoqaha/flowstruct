package com.gjuplans.api.course.mapper;

import com.gjuplans.api.course.domain.Course;
import com.gjuplans.api.course.dto.CourseDto;
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
                course.getOutdatedAt(),
                course.getOutdatedBy(),
                course.getCreatedAt(),
                course.getUpdatedAt(),
                course.getUpdatedBy()
        );
    }
}
