package com.yousefalfoqaha.gjuplans.user;

import com.yousefalfoqaha.gjuplans.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/api/v1/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDto request) {
        return new ResponseEntity<>(userService.verify(request), HttpStatus.OK);
    }
}
