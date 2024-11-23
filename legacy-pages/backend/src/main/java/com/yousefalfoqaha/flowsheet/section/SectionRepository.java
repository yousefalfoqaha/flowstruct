package com.yousefalfoqaha.flowsheet.section;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends ListCrudRepository<Section, Long> {
}
