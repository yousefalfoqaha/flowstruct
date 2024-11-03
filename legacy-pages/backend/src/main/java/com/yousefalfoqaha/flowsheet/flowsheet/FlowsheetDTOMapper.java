package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.coursemapping.CourseMapping;
import com.yousefalfoqaha.flowsheet.studyplan.StudyPlanDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FlowsheetDTOMapper implements Function<Flowsheet, FlowsheetDTO> {
    private final StudyPlanDTOMapper studyPlanDTOMapper;

    @Autowired
    public FlowsheetDTOMapper(StudyPlanDTOMapper studyPlanDTOMapper) {
        this.studyPlanDTOMapper = studyPlanDTOMapper;
    }

    @Override
    public FlowsheetDTO apply(Flowsheet f) {
        return new FlowsheetDTO(
              f.getUuid(),
              studyPlanDTOMapper.apply(f.getStudyPlan())
//              f.getCourseMappings().stream()
//                      .collect(Collectors.toMap(
//                              m -> m.getCourse().getId()
//                      ))
        );
    }
}
