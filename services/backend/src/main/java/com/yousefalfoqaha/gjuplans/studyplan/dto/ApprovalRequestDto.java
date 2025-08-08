package com.yousefalfoqaha.gjuplans.studyplan.dto;

import jakarta.validation.constraints.NotNull;

public record ApprovalRequestDto(
        String message,

        @NotNull(message = "Must pick an approver to send the request to.")
        long approver
) {
}
