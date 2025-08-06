package com.yousefalfoqaha.gjuplans.user.controller;

import com.yousefalfoqaha.gjuplans.user.dto.*;
import com.yousefalfoqaha.gjuplans.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @Value("${jwt.cookie.expiry}")
    private int cookieExpiry;

    @Value("${jwt.cookie.secure}")
    private boolean cookieSecure;

    @PostMapping("/login")
    public ResponseEntity<Void> loginUser(
            @Valid @RequestBody LoginDetailsDto loginDetails,
            HttpServletResponse response
    ) {
        String jwtToken = userService.verify(loginDetails);

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", jwtToken)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ofSeconds(cookieExpiry))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logoutUser(HttpServletResponse response) {
        ResponseCookie emptyCookie = ResponseCookie.from("accessToken")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, emptyCookie.toString());

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Map<Long, UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe() {
        return new ResponseEntity<>(userService.getMe(), HttpStatus.OK);
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> editMyDetails(
            @Valid @RequestBody UserDetailsDto details,
            HttpServletResponse response
    ) {
        UserWithTokenDto userWithToken = userService.editMyDetails(details);

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", userWithToken.token())
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ofSeconds(cookieExpiry))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());

        return new ResponseEntity<>(
                userWithToken.user(),
                HttpStatus.OK
        );
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changeMyPassword(@Valid @RequestBody PasswordDetailsDto passwordDetails) {
        userService.changeMyPassword(passwordDetails);
        return ResponseEntity.noContent().build();
    }
}
