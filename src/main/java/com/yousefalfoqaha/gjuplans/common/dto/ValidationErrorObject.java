package com.yousefalfoqaha.gjuplans.common.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

public record ValidationErrorObject(
        int status,
        List<String> messages,
        Date timestamp
) {
}
