package com.yousefalfoqaha.gjuplans.course;

import com.yousefalfoqaha.gjuplans.course.domain.Course;
import com.yousefalfoqaha.gjuplans.course.dto.request.CreateCourseRequest;
import com.yousefalfoqaha.gjuplans.course.dto.response.CourseResponse;
import com.yousefalfoqaha.gjuplans.course.dto.response.CreateCourseResponse;
import com.yousefalfoqaha.gjuplans.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/courses")
@RestController
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(
            @RequestParam(value = "code", defaultValue = "", required = false) String code,
            @RequestParam(value = "name", defaultValue = "", required = false) String name,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        return new ResponseEntity<>(courseService.getCourses(code, name, page, size), HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable long courseId) {
        return new ResponseEntity<>(courseService.getCourse(courseId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CreateCourseResponse> createCourse(
            @RequestBody @Valid CreateCourseRequest request
    ) {
        return new ResponseEntity<>(courseService.createCourse(request), HttpStatus.CREATED);
    }
}
