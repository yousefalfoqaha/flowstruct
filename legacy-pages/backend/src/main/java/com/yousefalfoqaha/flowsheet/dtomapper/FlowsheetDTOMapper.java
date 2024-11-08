package com.yousefalfoqaha.flowsheet.dtomapper;

import com.yousefalfoqaha.flowsheet.dto.CourseDTO;
import com.yousefalfoqaha.flowsheet.dto.CourseMappingDTO;
import com.yousefalfoqaha.flowsheet.dto.FlowsheetDTO;
import com.yousefalfoqaha.flowsheet.model.Course;
import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class FlowsheetDTOMapper implements Function<Flowsheet, FlowsheetDTO> {
    private final CourseDTOMapper courseDTOMapper;
    private final CourseMappingDTOMapper courseMappingDTOMapper;
    private final SemesterDTOMapper semesterDTOMapper;

    @Autowired
    public FlowsheetDTOMapper(
            CourseDTOMapper courseDTOMapper,
            CourseMappingDTOMapper courseMappingDTOMapper,
            SemesterDTOMapper semesterDTOMapper
    ) {
        this.courseDTOMapper = courseDTOMapper;
        this.courseMappingDTOMapper = courseMappingDTOMapper;
        this.semesterDTOMapper = semesterDTOMapper;
    }

    @Override
    public FlowsheetDTO apply(Flowsheet f) {
        Map<Long, CourseMappingDTO> courseMappingMap = new HashMap<>();
        List<CourseDTO> mappedCourses = new ArrayList<>();

        f.getCourseMappings().forEach(cm -> {
            Course mappedCourse = cm.getCourse();
            mappedCourses.add(courseDTOMapper.apply(mappedCourse));
            courseMappingMap.put(
                    mappedCourse.getId(),
                    courseMappingDTOMapper.apply(cm)
            );
        });

        return new FlowsheetDTO(
                f.getUuid(),
                f.getStudyPlan().getName(),
                f.getStudyPlan().getSemesters()
                        .stream()
                        .map(semesterDTOMapper)
                        .toList(),
                courseMappingMap,
                mappedCourses
        );
    }
}
