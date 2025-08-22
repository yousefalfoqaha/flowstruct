package com.yousefalfoqaha.gjuplans.user.repository;

import com.yousefalfoqaha.gjuplans.user.domain.User;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
