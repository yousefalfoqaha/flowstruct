package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.response.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

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
                course.isRemedial(),
                course.getPrerequisites()
                        .stream()
                        .map(prerequisite -> new CoursePrerequisiteResponse(
                                prerequisite.getPrerequisite().getId(),
                                prerequisite.getRelation()
                        ))
                        .collect(Collectors.toSet()),
                course.getCorequisites()
                        .stream()
                        .map(corequisite -> corequisite.getCorequisite().getId())
                        .collect(Collectors.toSet())
        );
    }
}
