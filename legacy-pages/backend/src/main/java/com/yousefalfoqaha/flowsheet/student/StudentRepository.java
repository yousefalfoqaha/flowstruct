package com.yousefalfoqaha.flowsheet.student;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentRepository extends CrudRepository<Student, UUID> {
}
