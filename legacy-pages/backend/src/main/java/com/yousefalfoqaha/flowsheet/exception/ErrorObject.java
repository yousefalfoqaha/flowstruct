package com.yousefalfoqaha.flowsheet.exception;

import java.util.Date;

public record ErrorObject(
        int statusCode,
        String message,
        Date timestamp
) {
}
