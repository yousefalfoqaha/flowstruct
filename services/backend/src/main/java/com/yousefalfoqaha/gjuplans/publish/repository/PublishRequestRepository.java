package com.yousefalfoqaha.gjuplans.publish.repository;

import com.yousefalfoqaha.gjuplans.publish.domain.PublishRequest;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublishRequestRepository extends ListCrudRepository<PublishRequest, Long> {
}
