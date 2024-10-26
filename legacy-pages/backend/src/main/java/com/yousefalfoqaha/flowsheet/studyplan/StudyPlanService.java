package com.yousefalfoqaha.flowsheet.studyplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;

    @Autowired
    public StudyPlanService(StudyPlanRepository studyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

}
