package com.yousefalfoqaha.gjuplans.studyplan.controller;

import com.yousefalfoqaha.gjuplans.studyplan.dto.PlacementDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanProgramMapService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study-plans/{studyPlanId}/course-placements")
public class StudyPlanProgramMapController {
    private final StudyPlanProgramMapService studyPlanProgramMapService;

    @PostMapping
    public ResponseEntity<StudyPlanDto> placeCoursesInSemester(
            @PathVariable long studyPlanId,
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds,
            @Valid @RequestBody PlacementDto targetPlacement
    ) {
        return new ResponseEntity<>(
                studyPlanProgramMapService.placeCoursesInSemester(studyPlanId, courseIds, targetPlacement),
                HttpStatus.OK
        );
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<StudyPlanDto> moveCourseToSemester(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @Valid @RequestBody PlacementDto targetPlacement
    ) {
        return new ResponseEntity<>(
                studyPlanProgramMapService.moveCourseToSemester(studyPlanId, courseId, targetPlacement),
                HttpStatus.OK
        );
    }

    @PutMapping("/{courseId}/resize")
    public ResponseEntity<StudyPlanDto> resizeCoursePlacement(
            @PathVariable long studyPlanId,
            @PathVariable long courseId,
            @RequestParam(value = "span", defaultValue = "1") int span
    ) {
        return new ResponseEntity<>(
                studyPlanProgramMapService.resizeCoursePlacement(studyPlanId, courseId, span),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<StudyPlanDto> removeCourseFromSemester(
            @PathVariable long studyPlanId,
            @PathVariable long courseId
    ) {
        return new ResponseEntity<>(
                studyPlanProgramMapService.removeCourseFromSemester(studyPlanId, courseId),
                HttpStatus.OK
        );
    }
}
