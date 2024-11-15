package com.yousefalfoqaha.flowsheet.repository;

import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FlowsheetRepository extends CrudRepository<Flowsheet, UUID> {
}
