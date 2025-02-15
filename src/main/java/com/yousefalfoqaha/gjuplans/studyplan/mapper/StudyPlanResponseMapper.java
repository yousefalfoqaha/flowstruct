package com.yousefalfoqaha.gjuplans.studyplan.mapper;

import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlan;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.SectionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.response.StudyPlanResponse;
import org.springframework.stereotype.Service;

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
                                sec.getCourses()
                                        .stream()
                                        .map(c -> c.getCourse().getId())
                                        .toList()
                        ))
                        .toList(),
                studyPlan.getCoursePlacements().entrySet()
                        .stream()
                        .collect(Collectors.toMap(
                                entry -> entry.getKey(),
                                entry -> entry.getValue().getSemester()
                        ))
        );
    }
}
