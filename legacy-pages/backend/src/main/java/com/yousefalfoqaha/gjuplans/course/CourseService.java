package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.dto.response.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
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

    public List<CourseResponse> getCoursesById(List<Long> courseIds) {
        var courses = courseRepository.findAllById(courseIds);

        return courses
                .stream()
                .map(c -> new CourseResponse(
                        c.getId(),
                        c.getCode(),
                        c.getName(),
                        c.getCreditHours(),
                        c.getPrerequisites()
                                .stream()
                                .map(pr -> new CoursePrerequisiteResponse(
                                        pr.getPrerequisite().getId(),
                                        pr.getRelation()
                                ))
                                .toList()
                ))
                .toList();
    }
}
