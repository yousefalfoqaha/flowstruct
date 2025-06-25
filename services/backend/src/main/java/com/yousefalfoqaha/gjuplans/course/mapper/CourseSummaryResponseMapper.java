package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.CourseSummaryDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CourseSummaryResponseMapper implements Function<Course, CourseSummaryDto> {

    @Override
    public CourseSummaryDto apply(Course course) {
        return new CourseSummaryDto(
                course.getId(),
                course.getCode(),
                course.getName(),
                course.getCreditHours(),
                course.getType().toString(),
                course.isRemedial(),
                course.getUpdatedAt(),
                course.getCreatedAt()
        );
    }
}
