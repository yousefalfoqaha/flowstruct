package com.yousefalfoqaha.flowsheet.flowsheet;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class FlowsheetService {
    private final FlowsheetRepository flowsheetRepository;
    private final FlowsheetDTOMapper flowsheetDTOMapper;

    @Autowired
    public FlowsheetService(FlowsheetRepository flowsheetRepository, FlowsheetDTOMapper flowsheetDTOMapper) {
        this.flowsheetRepository = flowsheetRepository;
        this.flowsheetDTOMapper = flowsheetDTOMapper;
    }

    public FlowsheetDTO getFlowsheetByUuid(UUID flowsheetUuid) {
        Flowsheet flowsheet = flowsheetRepository
                .findById(flowsheetUuid)
                .orElseThrow(() -> new EntityNotFoundException("Flowsheet not found"));

        return flowsheetDTOMapper.apply(flowsheet);
    }
}
