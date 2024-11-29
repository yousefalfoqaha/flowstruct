package com.yousefalfoqaha.gjuplans.common;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class ObjectValidator<T> {
    private final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = factory.getValidator();

    public void validate(T object) {
        var errorMessages = validator.validate(object)
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toSet());

        if (!errorMessages.isEmpty()) {
            throw new ObjectNotValidException(errorMessages);
        }
    }
}
