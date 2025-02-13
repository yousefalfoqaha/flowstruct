package com.yousefalfoqaha.gjuplans.common;

import com.yousefalfoqaha.gjuplans.program.exception.InvalidDegreeException;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.InvalidCoursePlacement;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProgramNotFoundException.class)
    public ResponseEntity<ErrorObject> handleProgramNotFoundException(
            ProgramNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(StudyPlanNotFoundException.class)
    public ResponseEntity<ErrorObject> handleStudyPlanNotFoundException(
            StudyPlanNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidDegreeException.class)
    public ResponseEntity<ErrorObject> handleInvalidDegreeException(
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
    public ResponseEntity<ErrorObject> handleUniqueProgramException(
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
    public ResponseEntity<ValidationErrorObject> handleObjectNotValidException(
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
    public ResponseEntity<ErrorObject> handleInvalidCoursePlacementException(
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
}
