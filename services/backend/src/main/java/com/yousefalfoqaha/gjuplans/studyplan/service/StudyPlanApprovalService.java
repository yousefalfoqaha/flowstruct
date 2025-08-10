package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.common.exception.AlreadyApprovedException;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;
import com.yousefalfoqaha.gjuplans.studyplan.dto.ApprovalRequestDto;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.exception.ApprovalRequestException;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import com.yousefalfoqaha.gjuplans.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyPlanApprovalService {
    private final StudyPlanService studyPlanService;
    private final JavaMailSender mailMessage;
    private final UserService userService;

    @PreAuthorize("hasRole('ROLE_EDITOR')")
    public void requestApproval(ApprovalRequestDto approvalRequest, long studyPlanId) {
        UserDto approver = userService.getUser(approvalRequest.approver());

        if (!approver.role().equalsIgnoreCase("APPROVER")) {
            throw new ApprovalRequestException("Request cannot be sent to a user without approval privileges.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(approver.email());
        message.setSubject("Approve StudyPlan Request");
        message.setText(studyPlanId + "/n" + approvalRequest.message());

        try {
            mailMessage.send(message);
        } catch (MailException e) {
            e.printStackTrace();
            throw new ApprovalRequestException("Could not request approval, try again.");
        }
    }

    @PreAuthorize("hasRole('ROLE_APPROVER')")
    @Transactional
    public StudyPlanDto approveStudyPlanChanges(long studyPlanId) {
        var studyPlan = studyPlanService.findOrThrow(studyPlanId);
        StudyPlanDraft lastApprovedStudyPlan = studyPlan.getApprovedStudyPlan();

        if (lastApprovedStudyPlan != null && Objects.equals(lastApprovedStudyPlan.getVersion(), studyPlan.getVersion())) {
            throw new AlreadyApprovedException("This version has already been approved.");
        }

        studyPlan.setApprovedStudyPlan(new StudyPlanDraft(studyPlan));
        studyPlan.getApprovedStudyPlan().setVersion(studyPlan.getVersion() + 1);

        return studyPlanService.saveAndMap(studyPlan);
    }
}
