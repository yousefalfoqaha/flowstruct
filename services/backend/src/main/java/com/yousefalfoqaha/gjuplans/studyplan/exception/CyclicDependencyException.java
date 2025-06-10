package com.yousefalfoqaha.gjuplans.studyplan.exception;

public class CyclicDependencyException extends RuntimeException {
    public CyclicDependencyException(String message) {
        super(message);
    }
}
