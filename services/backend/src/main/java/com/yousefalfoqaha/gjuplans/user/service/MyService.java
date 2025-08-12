package com.yousefalfoqaha.gjuplans.user.service;

import com.yousefalfoqaha.gjuplans.auth.service.JwtService;
import com.yousefalfoqaha.gjuplans.user.domain.User;
import com.yousefalfoqaha.gjuplans.user.dto.MyPasswordResetDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserWithTokenDto;
import com.yousefalfoqaha.gjuplans.user.exception.InvalidPasswordException;
import com.yousefalfoqaha.gjuplans.user.mapper.UserDtoMapper;
import com.yousefalfoqaha.gjuplans.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDtoMapper userDtoMapper;
    private final JwtService jwtService;

    public void changeMyPassword(MyPasswordResetDto passwordReset) {
        String newPassword = passwordReset.newPassword().trim();
        String confirmPassword = passwordReset.confirmPassword().trim();

        if (!confirmPassword.equals(newPassword)) {
            throw new InvalidPasswordException("New and confirmed passwords must be the same.");
        }

        User me = getCurrentUser();

        if (!passwordEncoder.matches(passwordReset.currentPassword().trim(), me.getPassword())) {
            throw new InvalidPasswordException("Enter the correct current password.");
        }

        me.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(me);
    }

    public UserWithTokenDto editMyDetails(UserDetailsDto details) {
        User me = getCurrentUser();

        me.setUsername(details.username().trim());
        me.setEmail(details.email().trim());

        userRepository.save(me);

        String token = jwtService.generateToken(me.getUsername());

        return new UserWithTokenDto(userDtoMapper.apply(me), token);
    }

    public UserDto getMe() {
        return userDtoMapper.apply(getCurrentUser());
    }

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user was found."));
    }
}
