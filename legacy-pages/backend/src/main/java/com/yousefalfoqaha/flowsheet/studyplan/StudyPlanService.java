package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanDTOMapper studyPlanDTOMapper;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository, StudyPlanDTOMapper studyPlanDTOMapper) {
        this.studyPlanRepository = studyPlanRepository;
        this.studyPlanDTOMapper = studyPlanDTOMapper;
    }

    public StudyPlanDTO getStudyPlanById(long studyPlanId) {
        StudyPlan studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new NoSuchElementException("Study plan not found"));

        return studyPlanDTOMapper.apply(studyPlan);
    }

    public StudyPlan createStudyPlan(StudyPlan studyPlan) {
        return studyPlanRepository.save(studyPlan);
    }
}
