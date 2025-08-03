package com.yousefalfoqaha.gjuplans.publishrequest.repository;

import com.yousefalfoqaha.gjuplans.publishrequest.domain.PublishRequest;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublishRequestRepository extends ListCrudRepository<PublishRequest, Long> {
}
