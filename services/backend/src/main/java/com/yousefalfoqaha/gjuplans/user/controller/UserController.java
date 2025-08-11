package com.yousefalfoqaha.gjuplans.user.controller;

import com.yousefalfoqaha.gjuplans.auth.service.CookieService;
import com.yousefalfoqaha.gjuplans.user.dto.*;
import com.yousefalfoqaha.gjuplans.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<Void> loginUser(
            @Valid @RequestBody LoginDetailsDto loginDetails,
            HttpServletResponse response
    ) {
        String jwtToken = userService.verify(loginDetails);
        cookieService.createAuthCookie(response, jwtToken);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logoutUser(HttpServletResponse response) {
        cookieService.clearAuthCookie(response);

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
        cookieService.createAuthCookie(response, userWithToken.token());

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
