package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.dto.CourseDetailsDto;
import com.yousefalfoqaha.gjuplans.course.dto.CourseDto;
import com.yousefalfoqaha.gjuplans.course.dto.CoursesPageDto;
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

    @GetMapping
    public ResponseEntity<CoursesPageDto> getPaginatedCourseList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "filter", defaultValue = "", required = false) String filter
    ) {
        return new ResponseEntity<>(courseService.getPaginatedCourseList(page, size, filter), HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDto> getCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(courseService.getCourse(courseId), HttpStatus.OK);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<CourseDto> editCourseDetails(
            @PathVariable long courseId,
            @Valid @RequestBody CourseDetailsDto courseDetails
    ) {
        return new ResponseEntity<>(courseService.editCourseDetails(courseId, courseDetails), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CourseDto> createCourse(
            @Valid @RequestBody CourseDetailsDto courseDetails
    ) {
        return new ResponseEntity<>(courseService.createCourse(courseDetails), HttpStatus.CREATED);
    }
}
