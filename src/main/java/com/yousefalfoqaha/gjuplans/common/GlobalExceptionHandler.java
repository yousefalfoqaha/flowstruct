package com.yousefalfoqaha.gjuplans.common;

import com.yousefalfoqaha.gjuplans.program.exception.InvalidDegreeException;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProgramNotFoundException.class)
    public ResponseEntity<ErrorObject> handleException(
            ProgramNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(StudyPlanNotFoundException.class)
    public ResponseEntity<ErrorObject> handleException(
            StudyPlanNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidDegreeException.class)
    public ResponseEntity<ErrorObject> handleException(
            InvalidDegreeException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(UniqueProgramException.class)
    public ResponseEntity<ErrorObject> handleException(
            UniqueProgramException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(ObjectNotValidException.class)
    public ResponseEntity<ValidationErrorObject> handleException(
            ObjectNotValidException exception
    ) {
        return new ResponseEntity<>(
                new ValidationErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getErrorMessages(),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(InvalidCoursePlacement.class)
    public ResponseEntity<ErrorObject> handleException(
            InvalidCoursePlacement exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(SectionNotFoundException.class)
    public ResponseEntity<ErrorObject> handleException(
            SectionNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(CourseExistsException.class)
    public ResponseEntity<ErrorObject> handleException(
            CourseExistsException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(NotEnoughSectionsException.class)
    public ResponseEntity<ErrorObject> handleException(
            NotEnoughSectionsException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(OutOfBoundsPositionException.class)
    public ResponseEntity<ErrorObject> handleException(
            OutOfBoundsPositionException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }
}
