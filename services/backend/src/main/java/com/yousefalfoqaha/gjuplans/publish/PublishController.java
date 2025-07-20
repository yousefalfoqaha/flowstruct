package com.yousefalfoqaha.gjuplans.publish;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/publish")
public class PublishController {
    private final PublishService publishService;

    @PostMapping
    public ResponseEntity<Void> publish(
            @RequestParam(value = "draftStudyPlans", defaultValue = "") List<Long> draftStudyPlanIds
    ) {
        publishService.publish(draftStudyPlanIds);
        return ResponseEntity.ok().build();
    }
}
