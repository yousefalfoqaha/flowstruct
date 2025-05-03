package com.yousefalfoqaha.gjuplans.common.dto;

import java.util.Date;

public record ErrorObject(
        int statusCode,
        String message,
        Date timestamp
) {
}
