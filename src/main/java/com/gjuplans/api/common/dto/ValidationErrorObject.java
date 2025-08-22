package com.gjuplans.api.common.dto;

import java.util.Date;
import java.util.List;

public record ValidationErrorObject(
        int status,
        List<String> messages,
        Date timestamp
) {
}
