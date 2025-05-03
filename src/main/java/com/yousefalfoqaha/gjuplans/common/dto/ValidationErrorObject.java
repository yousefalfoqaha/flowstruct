package com.yousefalfoqaha.gjuplans.common.dto;

import java.util.Date;
import java.util.Set;

public record ValidationErrorObject(
        int status,
        Set<String> messages,
        Date timestamp
) {
}
