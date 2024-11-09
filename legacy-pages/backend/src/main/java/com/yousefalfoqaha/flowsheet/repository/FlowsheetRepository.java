package com.yousefalfoqaha.flowsheet.repository;

import com.yousefalfoqaha.flowsheet.model.CourseMapping;
import com.yousefalfoqaha.flowsheet.model.Flowsheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlowsheetRepository extends JpaRepository<Flowsheet, UUID> {
}
