package com.yousefalfoqaha.flowsheet.flowsheet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;

@RestController
@RequestMapping("gju/flowsheet")
public class FlowsheetController {
    private final FlowsheetService flowsheetService;

    @Autowired
    public FlowsheetController(FlowsheetService flowsheetService) {
        this.flowsheetService = flowsheetService;
    }

    @GetMapping({"flowsheetUuid"})
    public FlowsheetDTO getFlowsheetByUuid(@PathVariable UUID flowsheetUuid) {
        return flowsheetService.getFlowsheetByUuid(flowsheetUuid);
    }
}
