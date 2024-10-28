package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    public List<Course> findAllCoursesByStudyPlanId(long studyPlanId) {
        return studyPlanRepository.findAllCoursesByStudyPlanId(studyPlanId);
    }
}
