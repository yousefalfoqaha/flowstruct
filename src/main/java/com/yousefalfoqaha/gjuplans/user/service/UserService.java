package com.yousefalfoqaha.gjuplans.user.service;

import com.yousefalfoqaha.gjuplans.auth.JwtService;
import com.yousefalfoqaha.gjuplans.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public String verify(UserDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

        if (!authentication.isAuthenticated()) {
            throw new AccessDeniedException("Access denied.");
        }

        return jwtService.generateToken(authentication.getName());
    }
}
