package com.yousefalfoqaha.flowsheet.common;

import java.util.Date;

public record ErrorObject(
        int statusCode,
        String message,
        Date timestamp
) {
}
