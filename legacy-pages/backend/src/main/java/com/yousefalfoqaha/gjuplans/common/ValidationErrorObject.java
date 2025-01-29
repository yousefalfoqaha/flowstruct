package com.yousefalfoqaha.gjuplans.common;

import java.util.Date;
import java.util.Set;

public record ValidationErrorObject(
        int status,
        Set<String> messages,
        Date timestamp
) {
}
