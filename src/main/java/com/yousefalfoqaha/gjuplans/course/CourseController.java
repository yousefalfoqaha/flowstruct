package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.dto.request.CreateCourseRequest;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CoursesPageResponse;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/v1/courses")
@RestController
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<CoursesPageResponse> getPaginatedCourses(
            @RequestParam(value = "search", defaultValue = "", required = false) String search,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        return new ResponseEntity<>(courseService.getPaginatedCourses(search, page, size), HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(courseService.getCourse(courseId), HttpStatus.OK);
    }

    @GetMapping("/by-ids")
    public ResponseEntity<Map<Long, CourseResponse>> getCoursesById(
            @RequestParam(value = "courses", defaultValue = "") List<Long> courseIds
    ) {
        return new ResponseEntity<>(courseService.getCoursesById(courseIds), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @RequestBody @Valid CreateCourseRequest request
    ) {
        return new ResponseEntity<>(courseService.createCourse(request), HttpStatus.CREATED);
    }
}
