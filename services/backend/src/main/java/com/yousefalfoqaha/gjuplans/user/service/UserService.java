package com.yousefalfoqaha.gjuplans.user.service;

import com.yousefalfoqaha.gjuplans.auth.JwtService;
import com.yousefalfoqaha.gjuplans.user.User;
import com.yousefalfoqaha.gjuplans.user.UserDtoMapper;
import com.yousefalfoqaha.gjuplans.user.UserRepository;
import com.yousefalfoqaha.gjuplans.user.dto.LoginDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import com.yousefalfoqaha.gjuplans.user.exception.InvalidCredentialsException;
import com.yousefalfoqaha.gjuplans.user.exception.InvalidPasswordException;
import com.yousefalfoqaha.gjuplans.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDtoMapper userDtoMapper;

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

        return userDtoMapper.apply(user);
    }

    public Map<Long, UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userDtoMapper)
                .collect(Collectors.toMap(
                        UserDto::id,
                        userDto -> userDto
                ));
    }

    public UserDto editUserDetails(long userId, UserDetailsDto details) {
        var user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user was found."));

        user.setUsername(details.username());

        String newPassword = details.newPassword().trim();
        String confirmPassword = details.confirmPassword().trim();

        if (!Objects.equals(newPassword, confirmPassword)) {
            throw new InvalidPasswordException("New and confirmed passwords must be the same.");
        }

        if (newPassword.isEmpty()) {
            return saveAndMapUser(user);
        }

        if (newPassword.length() <= 8) {
            throw new InvalidPasswordException("Password needs to be longer than 7 characters.");
        }

        newPassword = passwordEncoder.encode(newPassword);
        user.setPassword(newPassword);

        return saveAndMapUser(user);
    }

    private UserDto saveAndMapUser(User user) {
        try {
            User savedUser = userRepository.save(user);
            return userDtoMapper.apply(savedUser);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException(
                    "This user has been modified by another user while you were editing. Please refresh to see the latest details."
            );
        }
    }
}
