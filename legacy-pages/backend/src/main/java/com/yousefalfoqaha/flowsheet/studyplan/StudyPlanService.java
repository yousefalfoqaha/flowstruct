package com.yousefalfoqaha.flowsheet.studyplan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

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
