package com.yousefalfoqaha.gjuplans.guide;

import com.yousefalfoqaha.gjuplans.guide.domain.GuideCourse;
import com.yousefalfoqaha.gjuplans.guide.dto.response.GuideCourseResponse;
import com.yousefalfoqaha.gjuplans.guide.dto.response.GuideResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GuideService {
    private final GuideRepository guideRepository;

    public GuideResponse getGuideByStudyPlan(long studyPlanId) {
        var guide = guideRepository.findGuideByStudyPlan(studyPlanId)
                .orElseThrow(() -> new GuideNotFoundException(
                        "Guide for study plan with id " + studyPlanId + " was not found."
                ));

        Map<Long, GuideCourseResponse> courseResponses = guide.getGuideCourses()
                .entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            GuideCourse guideCourse = entry.getValue();
                            return new GuideCourseResponse(
                                    guideCourse.getYear(),
                                    guideCourse.getSemester()
                            );
                        }
                ));

        return new GuideResponse(courseResponses);
    }

}
