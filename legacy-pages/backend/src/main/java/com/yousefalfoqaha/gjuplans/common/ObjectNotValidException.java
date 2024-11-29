package com.yousefalfoqaha.gjuplans.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@RequiredArgsConstructor
@Getter
public class ObjectNotValidException extends RuntimeException {
    private final Set<String> errorMessages;
}
