package com.gjuplans.api.studyplan.service;

import com.gjuplans.api.common.exception.AlreadyApprovedException;
import com.gjuplans.api.program.dto.ProgramDto;
import com.gjuplans.api.program.service.ProgramService;
import com.gjuplans.api.studyplan.domain.StudyPlanDraft;
import com.gjuplans.api.studyplan.dto.ApprovalRequestDetailsDto;
import com.gjuplans.api.studyplan.dto.StudyPlanDto;
import com.gjuplans.api.studyplan.dto.StudyPlanSummaryDto;
import com.gjuplans.api.studyplan.exception.ApprovalRequestException;
import com.gjuplans.api.user.dto.UserDto;
import com.gjuplans.api.user.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class StudyPlanApprovalService {
    private final StudyPlanService studyPlanService;
    private final JavaMailSender mailMessage;
    private final UserService userService;
    private final ProgramService programService;

    @PreAuthorize("hasRole('ROLE_EDITOR')")
    public void requestApproval(ApprovalRequestDetailsDto approvalRequestDetails, long studyPlanId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDto requester = userService.getUserByUsername(authentication.getName());
        UserDto approver = userService.getUser(approvalRequestDetails.approver());

        if (!approver.role().equalsIgnoreCase("APPROVER")) {
            throw new ApprovalRequestException("Request cannot be sent to a user without approval privileges.");
        }

        var studyPlanSummary = studyPlanService.getStudyPlanSummary(studyPlanId);
        var program = programService.getProgram(studyPlanSummary.program());

        String htmlContent = buildSimpleEmailHtml(requester, studyPlanSummary, program, approvalRequestDetails.message());

        try {
            MimeMessage mimeMessage = mailMessage.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(approver.email());
            helper.setSubject("Study Plan Approval Request");
            helper.setText(htmlContent, true);
            helper.setFrom("noreply@studyplan.com");

            mailMessage.send(mimeMessage);

        } catch (MessagingException | MailException e) {
            throw new ApprovalRequestException("Could not request approval, try again.");
        }
    }

    private String buildSimpleEmailHtml(
            UserDto requester,
            StudyPlanSummaryDto studyPlanSummary,
            ProgramDto program,
            String message
    ) {
        StringBuilder html = new StringBuilder();

        html.append("""
                 <!DOCTYPE html>
                 <html>
                 <head>
                     <style>
                         body { font-family: Arial, sans-serif; padding: 20px; }
                         .container { max-width: 600px; margin: 0 auto; }
                         .button { background-color: #007bff; color: white; padding: 12px 24px;\s
                                  text-decoration: none; border-radius: 4px; display: inline-block; }
                         .message-box { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
                     </style>
                 </head>
                 <body>
                     <div class="container">
                         <h2>Study Plan Approval Request</h2>
                \s
                         <p><strong>Requested By:</strong> %s (%s)</p>
                         <p><strong>Program:</strong> %s
                         <p><strong>Study Plan:</strong> %s</p>
                \s"""
                .formatted(
                        requester.username(),
                        requester.email(),
                        program.degree() + " " + program.name() + " (" + program.code() + ")",
                        (studyPlanSummary.year() + " / " + (studyPlanSummary.year() + 1) + " " + studyPlanSummary.track())
                )
        );

        if (message != null && !message.trim().isEmpty()) {
            html.append("""
                        <div class="message-box">
                            <strong>Message from requester:</strong><br>
                            "%s"
                        </div>
                    """.formatted(message.trim()));
        }

        html.append("""
                        <p>
                            <a href="https://admin.gjuplans.com/study-plans/%d" class="button">View Study Plan</a>
                        </p>
                    </div>
                </body>
                </html>
                """.formatted(studyPlanSummary.id()));

        return html.toString();
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
