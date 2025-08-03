package com.yousefalfoqaha.gjuplans.publishrequest.dto;

import java.time.Instant;
import java.util.List;

public record PublishRequestDto(
        Long id,
        String status,
        String message,
        List<Long> programs,
        List<Long> studyPlans,
        List<Long> courses,
        Instant requestedAt,
        Long requestedBy
) {
}
