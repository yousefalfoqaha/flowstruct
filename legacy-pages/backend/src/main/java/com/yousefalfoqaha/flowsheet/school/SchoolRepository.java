package com.yousefalfoqaha.flowsheet.school;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends ListCrudRepository<School, Long> {
}
