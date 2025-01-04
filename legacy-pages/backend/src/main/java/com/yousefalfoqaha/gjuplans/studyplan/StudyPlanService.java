package com.yousefalfoqaha.gjuplans.studyplan;

import com.yousefalfoqaha.gjuplans.course.CourseService;
import com.yousefalfoqaha.gjuplans.program.ProgramService;
import com.yousefalfoqaha.gjuplans.studyplan.dto.SectionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanOptionResponse;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanResponse;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final CourseService courseService;
    private final ProgramService programService;

    public List<StudyPlanOptionResponse> getAllStudyPlans() {
        return studyPlanRepository.findAllStudyPlans()
                .stream()
                .map(o -> new StudyPlanOptionResponse(
                        o.id(),
                        o.year(),
                        o.track(),
                        o.program()
                ))
                .toList();
    }

    public List<StudyPlanOptionResponse> getAllProgramStudyPlans(long programId) {
        return studyPlanRepository.findAllProgramStudyPlans(programId)
                .stream()
                .map(sp -> new StudyPlanOptionResponse(
                        sp.id(),
                        sp.year(),
                        sp.track(),
                        sp.program()
                ))
                .toList();
    }

    public StudyPlanResponse getStudyPlan(long studyPlanId) {
        var studyPlan = studyPlanRepository.findById(studyPlanId)
                .orElseThrow(() -> new StudyPlanNotFoundException(
                        "Study plan with id " + studyPlanId + " was not found."
                ));

        return new StudyPlanResponse(
                studyPlan.getId(),
                studyPlan.getYear(),
                studyPlan.getTrack(),
                programService.getProgram(studyPlan.getProgram().getId()),
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
                courseService.getCoursesById(
                        studyPlan.getSections()
                                .stream()
                                .flatMap(sec -> sec.getCourses().stream())
                                .map(c -> c.getCourse().getId())
                                .distinct()
                                .toList()
                ),
                getAllProgramStudyPlans(studyPlan.getProgram().getId())
        );
    }
}
