package com.yousefalfoqaha.flowsheet.repository;

import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface FlowsheetRepository extends JpaRepository<Flowsheet, UUID> {
}
