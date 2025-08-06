package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanSummaryDto;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.mapper.StudyPlanDtoMapper;
import com.yousefalfoqaha.gjuplans.studyplan.mapper.StudyPlanSummaryDtoMapper;
import com.yousefalfoqaha.gjuplans.studyplan.repository.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanDtoMapper studyPlanDtoMapper;
    private final StudyPlanSummaryDtoMapper studyPlanSummaryDtoMapper;

    public StudyPlanDto getStudyPlan(long studyPlanId) {
        var studyPlan = findOrThrow(studyPlanId);
        return studyPlanDtoMapper.apply(studyPlan);
    }

    public List<StudyPlanSummaryDto> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlanSummaries()
                .stream()
                .map(studyPlanSummaryDtoMapper)
                .toList();
    }

    public StudyPlan findOrThrow(long studyPlanId) {
        return studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException("Study plan with id " + studyPlanId + " was not found."));
    }

    public StudyPlanDto saveAndMap(StudyPlan studyPlan) {
        try {
            StudyPlan savedStudyPlan = studyPlanRepository.save(studyPlan);
            return studyPlanDtoMapper.apply(savedStudyPlan);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException(
                    "This study plan has been modified by another user while you were editing. Please refresh to see the latest version."
            );
        }
    }
}
