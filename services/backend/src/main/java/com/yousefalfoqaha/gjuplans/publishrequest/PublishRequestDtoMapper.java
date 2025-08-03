package com.yousefalfoqaha.gjuplans.publishrequest;

import com.yousefalfoqaha.gjuplans.publishrequest.domain.PublishRequest;
import com.yousefalfoqaha.gjuplans.publishrequest.dto.PublishRequestDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PublishRequestDtoMapper implements Function<PublishRequest, PublishRequestDto> {

    @Override
    public PublishRequestDto apply(PublishRequest request) {
        return new PublishRequestDto(
                request.getId(),
                request.getStatus().name(),
                request.getMessage(),
                request.getPrograms()
                        .stream()
                        .map(id -> id.getProgram().getId())
                        .toList(),
                request.getStudyPlans()
                        .stream()
                        .map(id -> id.getStudyPlan().getId())
                        .toList(),
                request.getCourses()
                        .stream()
                        .map(id -> id.getCourse().getId())
                        .toList(),
                request.getRequestedAt(),
                request.getRequestedBy()
        );
    }
}
