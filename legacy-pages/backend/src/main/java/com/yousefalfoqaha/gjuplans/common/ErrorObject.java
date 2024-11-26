package com.yousefalfoqaha.gjuplans.common;

import java.util.Date;

public record ErrorObject(
        int statusCode,
        String message,
        Date timestamp
) {
}
