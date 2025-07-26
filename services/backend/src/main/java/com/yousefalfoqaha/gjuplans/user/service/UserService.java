package com.yousefalfoqaha.gjuplans.user.service;

import com.yousefalfoqaha.gjuplans.auth.JwtService;
import com.yousefalfoqaha.gjuplans.user.User;
import com.yousefalfoqaha.gjuplans.user.UserDtoMapper;
import com.yousefalfoqaha.gjuplans.user.UserRepository;
import com.yousefalfoqaha.gjuplans.user.dto.LoginDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.PasswordDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import com.yousefalfoqaha.gjuplans.user.exception.InvalidCredentialsException;
import com.yousefalfoqaha.gjuplans.user.exception.InvalidPasswordException;
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
        return userDtoMapper.apply(getCurrentUser());
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

    public UserDto editMyDetails(UserDetailsDto details) {
        User me = getCurrentUser();

        me.setUsername(details.username().trim());
        me.setEmail(details.email().trim());

        return saveAndMapUser(me);
    }

    public UserDto changeMyPassword(PasswordDetailsDto passwordDetails) {
        String newPassword = passwordDetails.newPassword().trim();
        String confirmPassword = passwordDetails.confirmPassword().trim();

        if (!confirmPassword.equals(newPassword)) {
            throw new InvalidPasswordException("New and confirmed passwords must be the same.");
        }

        User me = getCurrentUser();

        if (!passwordEncoder.matches(passwordDetails.currentPassword(), me.getPassword())) {
            throw new InvalidPasswordException("Enter the correct current password.");
        }

        me.setPassword(passwordEncoder.encode(newPassword));

        return saveAndMapUser(me);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user was found."));
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
