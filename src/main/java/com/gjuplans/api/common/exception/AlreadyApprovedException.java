package com.gjuplans.api.common.exception;

public class AlreadyApprovedException extends RuntimeException {
    public AlreadyApprovedException(String message) {
        super(message);
    }
}
