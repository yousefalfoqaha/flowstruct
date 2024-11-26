package com.yousefalfoqaha.gjuplans.program;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends ListCrudRepository<Program, Long> {
}
