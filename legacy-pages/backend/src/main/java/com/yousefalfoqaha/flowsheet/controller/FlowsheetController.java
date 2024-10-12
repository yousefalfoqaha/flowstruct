package com.yousefalfoqaha.flowsheet.controller;

import com.yousefalfoqaha.flowsheet.dto.StudentFlowsheetDTO;
import com.yousefalfoqaha.flowsheet.service.FlowsheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("gju/flowsheet")
public class FlowsheetController {

    private final FlowsheetService flowsheetService;

    @Autowired
    public FlowsheetController(FlowsheetService flowsheetService) {
        this.flowsheetService = flowsheetService;
    }

    @GetMapping("{studentId}")
    public StudentFlowsheetDTO getStudentFlowsheet(@PathVariable long studentId) {
        return flowsheetService.getStudentFlowsheetByStudentId(studentId);
    }

}
