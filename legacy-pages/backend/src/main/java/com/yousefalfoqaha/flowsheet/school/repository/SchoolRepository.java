package com.yousefalfoqaha.flowsheet.school.repository;

import com.yousefalfoqaha.flowsheet.school.domain.School;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends ListCrudRepository<School, Long> {
}
