package com.yousefalfoqaha.gjuplans.course.mapper;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.response.CoursesPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class CoursesPageResponseMapper implements Function<Page<Course>, CoursesPageResponse> {
    private final CourseSummaryResponseMapper courseSummaryResponseMapper;

    @Override
    public CoursesPageResponse apply(Page<Course> coursesPage) {
        return new CoursesPageResponse(
                coursesPage.getContent()
                        .stream()
                        .map(courseSummaryResponseMapper)
                        .toList(),
                coursesPage.getNumber(),
                coursesPage.getSize(),
                coursesPage.getTotalElements(),
                coursesPage.getTotalPages(),
                coursesPage.isLast()
        );
    }
}
