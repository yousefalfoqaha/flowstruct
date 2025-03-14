package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.CoursePrerequisiteResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.SectionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class StudyPlanResponseMapper implements Function<StudyPlan, StudyPlanResponse> {

    @Override
    public StudyPlanResponse apply(StudyPlan studyPlan) {
        return new StudyPlanResponse(
                studyPlan.getId(),
                studyPlan.getYear(),
                studyPlan.getDuration(),
                studyPlan.getTrack(),
                studyPlan.isPrivate(),
                studyPlan.getProgram().getId(),
                studyPlan.getSections()
                        .stream()
                        .map(sec -> new SectionResponse(
                                sec.getId(),
                                sec.getLevel(),
                                sec.getType(),
                                sec.getRequiredCreditHours(),
                                sec.getName(),
                                sec.getCourses().keySet().stream().collect(Collectors.toSet())
                        ))
                        .toList(),
                studyPlan.getCoursePlacements().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                entry -> entry.getValue().getSemester()
                        )),
                studyPlan.getCoursePrerequisitesMap().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                entry -> entry.getValue()
                                        .stream()
                                        .map(prerequisite -> new CoursePrerequisiteResponse(
                                                prerequisite.getPrerequisite().getId(),
                                                prerequisite.getRelation()
                                        ))
                                        .collect(Collectors.toSet())
                        )),
                studyPlan.getCourseCorequisitesMap().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                entry -> entry.getValue()
                                        .stream()
                                        .map(corequisite -> corequisite.getCorequisite().getId())
                                        .collect(Collectors.toSet())
                        ))
        );
    }
}
