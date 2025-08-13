package com.yousefalfoqaha.gjuplans.course.controller;

import com.yousefalfoqaha.gjuplans.course.dto.CourseDetailsDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CoursesPageDto;
import com.yousefalfoqaha.gjuplans.course.service.CourseManagerService;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/courses")
@RestController
public class CourseController {
    private final CourseService courseService;
    private final CourseManagerService courseManagerService;

    @GetMapping
    public ResponseEntity<CoursesPageDto> getPaginatedCourseList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "filter", defaultValue = "", required = false) String filter,
            @RequestParam(value = "archived", defaultValue = "false", required = false) boolean archived
    ) {
        return new ResponseEntity<>(
                courseService.getPaginatedCourseList(page, size, filter, archived),
                HttpStatus.OK
        );
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDto> getCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(
                courseService.getCourse(courseId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<CourseDto> editCourseDetails(
            @PathVariable long courseId,
            @Valid @RequestBody CourseDetailsDto courseDetails
    ) {
        return new ResponseEntity<>(
                courseManagerService.editCourseDetails(courseId, courseDetails),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<CourseDto> createCourse(
            @Valid @RequestBody CourseDetailsDto courseDetails
    ) {
        return new ResponseEntity<>(
                courseManagerService.createCourse(courseDetails),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable long courseId) {
        courseManagerService.deleteCourse(courseId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{courseId}/archive")
    public ResponseEntity<CourseDto> archiveCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(
                courseManagerService.archiveCourse(courseId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{courseId}/unarchive")
    public ResponseEntity<CourseDto> unarchiveCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(
                courseManagerService.unarchiveCourse(courseId),
                HttpStatus.OK
        );
    }
}
