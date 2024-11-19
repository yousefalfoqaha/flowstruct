package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.ProgramCardDTO;
import com.yousefalfoqaha.flowsheet.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService {
    private final ProgramRepository programRepository;

    @Autowired
    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<ProgramCardDTO> getAllProgramCards() {
        return programRepository.findAll()
                .stream()
                .map(p -> new ProgramCardDTO(
                        p.id(),
                        p.name(),
                        p.degree().toString()
                ))
                .toList();
    }

}
