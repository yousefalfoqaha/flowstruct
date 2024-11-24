package com.yousefalfoqaha.flowsheet.section.repository;

import com.yousefalfoqaha.flowsheet.section.domain.Section;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends ListCrudRepository<Section, Long> {
}
