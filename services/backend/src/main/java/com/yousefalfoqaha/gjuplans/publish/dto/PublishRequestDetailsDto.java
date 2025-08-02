package com.yousefalfoqaha.gjuplans.publish.dto;

import java.util.List;

public record PublishRequestDetailsDto(
        String message,

        List<Long> programs,

        List<Long> studyPlans,

        List<Long> courses
) {
}
