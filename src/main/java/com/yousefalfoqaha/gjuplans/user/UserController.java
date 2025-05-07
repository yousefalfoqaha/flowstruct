package com.yousefalfoqaha.gjuplans.user;

import com.yousefalfoqaha.gjuplans.user.dto.LoginDetailsDto;
import com.yousefalfoqaha.gjuplans.user.dto.UserDto;
import com.yousefalfoqaha.gjuplans.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Void> loginUser(@RequestBody LoginDetailsDto loginDetails, HttpServletResponse response) {
        String jwtToken = userService.verify(loginDetails);

        ResponseCookie cookie = ResponseCookie.from("accessToken", jwtToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe() {
        return new ResponseEntity<>(userService.getMe(), HttpStatus.OK);
    }
}
