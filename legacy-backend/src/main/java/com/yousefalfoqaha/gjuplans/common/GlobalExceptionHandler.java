package com.yousefalfoqaha.gjuplans.common;

import com.yousefalfoqaha.gjuplans.common.dto.ErrorObject;
import com.yousefalfoqaha.gjuplans.program.exception.InvalidDegreeException;
import com.yousefalfoqaha.gjuplans.program.exception.ProgramNotFoundException;
import com.yousefalfoqaha.gjuplans.program.exception.UniqueProgramException;
import com.yousefalfoqaha.gjuplans.studyplan.exception.*;
import com.yousefalfoqaha.gjuplans.user.InvalidCredentialsException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProgramNotFoundException.class)
    public ResponseEntity<ErrorObject> handleException(
            ProgramNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.NOT_FOUND.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorObject> handleException(
            MethodArgumentNotValidException exception
    ) {
        var errorMessages = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        errorMessages,
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(CourseNotPlacedException.class)
    public ResponseEntity<ErrorObject> handleException(
            CourseNotPlacedException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.NOT_FOUND.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidSpanException.class)
    public ResponseEntity<ErrorObject> handleException(
            InvalidSpanException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorObject> handleException(
            InvalidCredentialsException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.UNAUTHORIZED.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(StudyPlanNotFoundException.class)
    public ResponseEntity<ErrorObject> handleException(
            StudyPlanNotFoundException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(HttpStatus.NOT_FOUND.value(), List.of(exception.getMessage()), new Date()),
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
                        List.of(exception.getMessage()),
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
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<ErrorObject> handleException(
            OptimisticLockingFailureException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(CyclicDependencyException.class)
    public ResponseEntity<ErrorObject> handleException(
            CyclicDependencyException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(InvalidCoursePlacement.class)
    public ResponseEntity<ErrorObject> handleException(
            InvalidCoursePlacement exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.CONFLICT.value(),
                        List.of(exception.getMessage()),
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
                        List.of(exception.getMessage()),
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
                        List.of(exception.getMessage()),
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
                        List.of(exception.getMessage()),
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
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(CourseAlreadyAddedException.class)
    public ResponseEntity<ErrorObject> handleException(
            CourseAlreadyAddedException exception
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        HttpStatus.BAD_REQUEST.value(),
                        List.of(exception.getMessage()),
                        new Date()
                ),
                HttpStatus.BAD_REQUEST
        );
    }
}
