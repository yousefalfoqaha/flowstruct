package com.yousefalfoqaha.gjuplans.publish.service;

import com.yousefalfoqaha.gjuplans.publish.domain.*;
import com.yousefalfoqaha.gjuplans.publish.dto.PublishRequestDetailsDto;
import com.yousefalfoqaha.gjuplans.publish.repository.PublishRequestRepository;
import com.yousefalfoqaha.gjuplans.studyplan.service.StudyPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PublishService {
    private final PublishRequestRepository publishRequestRepository;
    private final StudyPlanService studyPlanService;

    // TODO: check if aggregates first before naively adding them to the request payload
    // TODO: only allow requests if there are no other pending requests, perhaps a pessimistic key
    @Transactional
    public void requestPublish(PublishRequestDetailsDto details) {
        var request = new PublishRequest(
                null,
                RequestStatus.SUCCESS,
                details.message(),
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
