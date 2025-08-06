package com.yousefalfoqaha.gjuplans.studyplan.service;

import com.yousefalfoqaha.gjuplans.common.AlreadyApprovedException;
import com.yousefalfoqaha.gjuplans.studyplan.domain.StudyPlanDraft;
import com.yousefalfoqaha.gjuplans.studyplan.dto.StudyPlanDto;
import com.yousefalfoqaha.gjuplans.studyplan.repository.StudyPlanRepository;
import com.yousefalfoqaha.gjuplans.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class StudyPlanApprovalService {
    private final StudyPlanRepository studyPlanRepository;
    private final StudyPlanService studyPlanService;
    private final JavaMailSender mailMessage;
    private final UserService userService;

//    public void requestApproval(ApprovalRequestDto approvalRequest, List<Long> studyPlanIds) {
//        User approver = userService.getUser();
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo();
//
//        try {
//            mailMessage.send(message);
//        } catch (MailException e) {
//            throw new ApprovalRequestException("Could not request approval, try again.");
//        }
//
//        studyPlanRepository.markStudyPlanPending();
//    }

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
