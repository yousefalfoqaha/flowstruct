package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.domain.CoursePrerequisite;
import com.yousefalfoqaha.gjuplans.course.dto.response.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Map<Long, CourseResponse> getCoursesById(List<Long> courseIds) {
        Map<Long, Course> courses = courseRepository.findAllById(courseIds)
                .stream()
                .collect(Collectors.toMap(Course::getId, course -> course));

        return courses
                .values()
                .stream()
                .collect(Collectors.toMap(
                        c -> c.getId(),
                        c -> new CourseResponse(
                                c.getId(),
                                c.getCode(),
                                c.getName(),
                                c.getCreditHours(),
                                c.getPrerequisites()
                                        .stream()
                                        .collect(Collectors.toMap(
                                                pr -> pr.getPrerequisite().getId(),
                                                pr -> new CoursePrerequisiteResponse(
                                                        pr.getPrerequisite().getId(),
                                                        pr.getRelation()
                                        ))
                                ))
                ));
    }

    private Map<Long, List<Map<Long, CoursePrerequisite>>> getPrerequisiteSequence() {
        
    }
}
