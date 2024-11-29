package com.yousefalfoqaha.gjuplans.common;

import java.util.Date;
import java.util.Set;

public record ValidationErrorObject(
        int statusCode,
        Set<String> messages,
        Date timestamp
) {
}
