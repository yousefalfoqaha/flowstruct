package com.yousefalfoqaha.gjuplans.publish;

import com.yousefalfoqaha.gjuplans.publish.dto.PublishRequestDetailsDto;
import com.yousefalfoqaha.gjuplans.publish.service.PublishService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/publish")
public class PublishController {
    private final PublishService publishService;

    @PostMapping("/request")
    public ResponseEntity<Void> requestPublish(@Valid @RequestBody PublishRequestDetailsDto details) {
        publishService.requestPublish(details);
        return ResponseEntity.ok().build();
    }
}
