package com.yousefalfoqaha.flowsheet.controller;

import com.yousefalfoqaha.flowsheet.dto.ProgramCardDTO;
import com.yousefalfoqaha.flowsheet.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/programs")
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<ProgramCardDTO> getAllProgramCards() {
        return programService.getAllProgramCards();
    }
}
