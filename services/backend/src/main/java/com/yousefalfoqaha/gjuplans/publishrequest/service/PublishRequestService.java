package com.yousefalfoqaha.gjuplans.publishrequest.service;

import com.yousefalfoqaha.gjuplans.publishrequest.PublishRequestDtoMapper;
import com.yousefalfoqaha.gjuplans.publishrequest.domain.*;
import com.yousefalfoqaha.gjuplans.publishrequest.dto.PublishRequestDetailsDto;
import com.yousefalfoqaha.gjuplans.publishrequest.dto.PublishRequestDto;
import com.yousefalfoqaha.gjuplans.publishrequest.repository.PublishRequestRepository;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PublishRequestService {
    private final PublishRequestRepository publishRequestRepository;
    private final StudyPlanService studyPlanService;
    private final PublishRequestDtoMapper publishRequestDtoMapper;

    public List<PublishRequestDto> getAllPublishRequests() {
        return publishRequestRepository.findAll()
                .stream()
                .map(publishRequestDtoMapper)
                .toList();
    }

    // TODO: check if aggregates first before naively adding them to the request payload
    // TODO: only allow requests if there are no other pending requests, perhaps a pessimistic key
    @Transactional
    public void requestPublish(PublishRequestDetailsDto details) {
        var request = new PublishRequest(
                null,
                RequestStatus.SUCCESS,
                details.message().trim(),
                details.programs().stream()
                        .map(id -> new PublishRequestProgram(AggregateReference.to(id)))
                        .collect(Collectors.toSet()),
                details.studyPlans().stream()
                        .map(id -> new PublishRequestStudyPlan(AggregateReference.to(id)))
                        .collect(Collectors.toSet()),
                details.courses().stream()
                        .map(id -> new PublishRequestCourse(AggregateReference.to(id)))
                        .collect(Collectors.toSet()),
                null,
                null
        );

        publishRequestRepository.save(request);

        studyPlanService.markStudyPlansPublished(details.studyPlans());
    }
}
