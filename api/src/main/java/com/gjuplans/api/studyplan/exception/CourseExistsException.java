package com.gjuplans.api.studyplan.exception;

public class CourseExistsException extends RuntimeException {
    public CourseExistsException(String message) {
        super(message);
    }
}
