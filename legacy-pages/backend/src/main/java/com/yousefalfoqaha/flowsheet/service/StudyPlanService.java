package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.model.Course;
import com.yousefalfoqaha.flowsheet.model.StudyPlan;
import com.yousefalfoqaha.flowsheet.dto.StudyPlanDTO;
import com.yousefalfoqaha.flowsheet.mapper.StudyPlanMapper;
import com.yousefalfoqaha.flowsheet.repository.StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanMapper studyPlanMapper;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository, StudyPlanMapper studyPlanMapper) {
        this.studyPlanRepository = studyPlanRepository;
        this.studyPlanMapper = studyPlanMapper;
    }

    public StudyPlanDTO getStudyPlan(long studyPlanId) {
        StudyPlan studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new NoSuchElementException("Study plan not found"));

        return studyPlanMapper.apply(studyPlan);
    }

    public StudyPlan createStudyPlan(StudyPlan studyPlan) {
        return studyPlanRepository.save(studyPlan);
    }

    public List<Course> getStudyPlanCourses(long studyPlanId, List<Long> courseIds) {
        return studyPlanRepository.findCoursesInStudyPlan(studyPlanId, courseIds);
    }
}
