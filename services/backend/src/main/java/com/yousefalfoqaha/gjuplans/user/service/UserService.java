package com.yousefalfoqaha.gjuplans.user.service;

import com.yousefalfoqaha.gjuplans.auth.JwtService;
import com.yousefalfoqaha.gjuplans.user.InvalidCredentialsException;
import com.yousefalfoqaha.gjuplans.user.User;
import com.yousefalfoqaha.gjuplans.user.UserRepository;
import com.yousefalfoqaha.gjuplans.user.dto.LoginDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public String verify(LoginDetailsDto details) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(details.username(), details.password())
            );

            return jwtService.generateToken(authentication.getName());
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Wrong username or password.");
        }
    }

    public UserDto getMe() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No account was found."));

        return new UserDto(user.getId(), user.getUsername());
    }

    public Map<Long, UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toMap(
                        UserDto::id,
                        userDto -> userDto
                ));
    }
}
