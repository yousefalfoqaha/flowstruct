package com.yousefalfoqaha.gjuplans.common;

import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.StudyPlanNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProgramNotFoundException.class)
    public ResponseEntity<ErrorObject> handleProgramNotFoundException(
            ProgramNotFoundException exception,
            WebRequest request
    ) {
        return new ResponseEntity<ErrorObject>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(StudyPlanNotFoundException.class)
    public ResponseEntity<ErrorObject> handleStudyPlanNotFoundException(
            StudyPlanNotFoundException exception,
            WebRequest request
    ) {
        return new ResponseEntity<ErrorObject>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), exception.getMessage(), new Date()),
                HttpStatus.NOT_FOUND
        );
    }
}
