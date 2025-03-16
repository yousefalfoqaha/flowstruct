package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CourseResponseMapper implements Function<Course, CourseResponse> {

    @Override
    public CourseResponse apply(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getCreditHours(),
                course.getEcts(),
                course.getLectureHours(),
                course.getPracticalHours(),
                course.getType(),
                course.isRemedial()
        );
    }
}
