package com.yousefalfoqaha.flowsheet.flowsheet;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class FlowsheetService {
    private final FlowsheetRepository flowsheetRepository;

    @Autowired
    public FlowsheetService(FlowsheetRepository flowsheetRepository) {
        this.flowsheetRepository = flowsheetRepository;
    }

    public Optional<FlowsheetDTO> getFlowsheetByUuid(UUID flowsheetUuid) {
        return flowsheetRepository
                .findById(flowsheetUuid)
                .map(f -> new FlowsheetDTO(
                        f.getUuid(),
                        f.isSuggested(),
                        f.getPassword(),
                        f.getStudyPlan(),
                        f.getCourseMappings()
                        ))
                .orElseThrow(() -> new EntityNotFoundException(
                        "Flowsheet with UUID " + flowsheetUuid + " was not found."
                );
    }
}
