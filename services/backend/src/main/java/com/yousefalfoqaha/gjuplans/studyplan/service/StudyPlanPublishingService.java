package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.studyplan.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyPlanPublishingService {
    private final StudyPlanRepository studyPlanRepository;

    public void publishStudyPlans(List<Long> draftStudyPlanIds) {
        studyPlanRepository.markAllStudyPlansPublsihed(draftStudyPlanIds);
    }
}
