package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CourseSummaryResponseMapper implements Function<Course, CourseSummaryResponse> {

    @Override
    public CourseSummaryResponse apply(Course course) {
        return new CourseSummaryResponse(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getCreditHours(),
                course.getType().toString()
        );
    }
}
