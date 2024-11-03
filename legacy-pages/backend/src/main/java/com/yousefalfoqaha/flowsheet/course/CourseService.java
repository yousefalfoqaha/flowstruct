package com.yousefalfoqaha.flowsheet.course;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCoursesByStudyPlanId(long studyPlanId) {
        return courseRepository.findAllCoursesByStudyPlanId(studyPlanId);
    }
}
