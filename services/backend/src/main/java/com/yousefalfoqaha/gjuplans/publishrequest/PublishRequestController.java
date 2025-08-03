package com.yousefalfoqaha.gjuplans.publishrequest;

import com.yousefalfoqaha.gjuplans.publishrequest.dto.PublishRequestDetailsDto;
import com.yousefalfoqaha.gjuplans.publishrequest.dto.PublishRequestDto;
import com.yousefalfoqaha.gjuplans.publishrequest.service.PublishRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/publish-requests")
public class PublishRequestController {
    private final PublishRequestService publishRequestService;

    @GetMapping
    public ResponseEntity<List<PublishRequestDto>> getAllPublishRequests() {
        return new ResponseEntity<>(
                publishRequestService.getAllPublishRequests(),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<Void> requestPublish(@Valid @RequestBody PublishRequestDetailsDto details) {
        publishRequestService.requestPublish(details);
        return ResponseEntity.ok().build();
    }
}
