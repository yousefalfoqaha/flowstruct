package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import com.yousefalfoqaha.flowsheet.dto.FlowsheetDTO;
import com.yousefalfoqaha.flowsheet.dtomapper.FlowsheetDTOMapper;
import com.yousefalfoqaha.flowsheet.repository.FlowsheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;
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

    public FlowsheetDTO getFlowsheet(UUID flowsheetUuid) {
        Flowsheet flowsheet = flowsheetRepository
                .findById(flowsheetUuid)
                .orElseThrow(() -> new NoSuchElementException("Flowsheet not found"));

        return flowsheetDTOMapper.apply(flowsheet);
    }
}
