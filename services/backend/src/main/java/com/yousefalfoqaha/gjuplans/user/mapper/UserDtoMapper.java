package com.yousefalfoqaha.gjuplans.user.mapper;

import com.yousefalfoqaha.gjuplans.user.domain.User;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDtoMapper implements Function<User, UserDto> {

    @Override
    public UserDto apply(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
