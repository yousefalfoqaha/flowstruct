package com.yousefalfoqaha.flowsheet.course.service;

import com.yousefalfoqaha.flowsheet.course.dto.response.CourseResponse;
import com.yousefalfoqaha.flowsheet.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseResponse> getCoursesByIds(List<Long> courseIds) {
        return courseRepository.findAllById(courseIds)
                .stream()
                .map(c -> new CourseResponse(
                        c.getId(),
                        c.getName(),
                        c.getCreditHours(),
                        c.getPrerequisites()
                                .stream()
                                .map(pr -> pr.prerequisite().getId())
                                .toList()
                ))
                .toList();
    }
}
