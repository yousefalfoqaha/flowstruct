package com.yousefalfoqaha.flowsheet.controller;

import com.yousefalfoqaha.flowsheet.dto.AddCoursesToFlowsheetRequest;
import com.yousefalfoqaha.flowsheet.dto.FlowsheetDTO;
import com.yousefalfoqaha.flowsheet.service.FlowsheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("gju/flowsheet")
public class FlowsheetController {
    private final FlowsheetService flowsheetService;

    @Autowired
    public FlowsheetController(FlowsheetService flowsheetService) {
        this.flowsheetService = flowsheetService;
    }

    @GetMapping("/{flowsheetUuid}")
    public FlowsheetDTO getFlowsheetByUuid(@PathVariable UUID flowsheetUuid) {
        return flowsheetService.getFlowsheet(flowsheetUuid);
    }

    @PostMapping("/{flowsheetUuid}")
    public void addCoursesToFlowsheet(
            @RequestBody AddCoursesToFlowsheetRequest request,
            @PathVariable UUID flowsheetUuid
    ) {
        flowsheetService.addCourses(request, flowsheetUuid);
    }
}
