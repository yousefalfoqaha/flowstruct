package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.course.Course;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class FlowsheetService {
    private final FlowsheetRepository flowsheetRepository;
    private final FlowsheetDTOMapper flowsheetDTOMapper;
    private final StudyPlanService studyPlanService;

    @Autowired
    public FlowsheetService(FlowsheetRepository flowsheetRepository, FlowsheetDTOMapper flowsheetDTOMapper, StudyPlanService studyPlanService) {
        this.flowsheetRepository = flowsheetRepository;
        this.flowsheetDTOMapper = flowsheetDTOMapper;
        this.studyPlanService = studyPlanService;
    }

    public FlowsheetDTO getFlowsheetByUuid(UUID flowsheetUuid) {
        Flowsheet flowsheet = flowsheetRepository
                .findById(flowsheetUuid)
                .orElseThrow(() -> new EntityNotFoundException("Flowsheet not found"));

        return flowsheetDTOMapper.apply(flowsheet);
    }

    public CourseStatus getCourseStatus(long courseId, UUID flowsheetUuid) {
        Course course = flowsheetRepository.findCourseInFlowsheet(courseId, flowsheetUuid);

        if (course == null) return CourseStatus.DISABLED;



        return CourseStatus.AVAILABLE;
    }
}
