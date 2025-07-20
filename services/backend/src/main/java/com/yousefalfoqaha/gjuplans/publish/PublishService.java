package com.yousefalfoqaha.gjuplans.publish;

import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PublishService {
    private final StudyPlanService studyPlanService;

    public void publish(List<Long> draftStudyPlans) {
        studyPlanService.markStudyPlansPublished(draftStudyPlans);
    }
}
