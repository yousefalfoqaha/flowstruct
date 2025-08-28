package com.gjuplans.api.course.mapper;

import com.gjuplans.api.course.domain.Course;
import com.gjuplans.api.course.dto.CoursesPageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class CoursesPageResponseMapper implements Function<Page<Course>, CoursesPageDto> {
    private final CourseSummaryDtoMapper courseSummaryDtoMapper;

    @Override
    public CoursesPageDto apply(Page<Course> coursesPage) {
        return new CoursesPageDto(
                coursesPage.getContent()
                        .stream()
                        .map(courseSummaryDtoMapper)
                        .toList(),
                coursesPage.getNumber(),
                coursesPage.getSize(),
                coursesPage.getTotalElements(),
                coursesPage.getTotalPages(),
                coursesPage.isLast()
        );
    }
}
