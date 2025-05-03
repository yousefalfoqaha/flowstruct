package com.yousefalfoqaha.gjuplans.user;

import io.jsonwebtoken.Jwts;
import lombok.Getter;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;

@Service
@Getter
public class JwtService {
    private final Key secretKey;

    public JwtService() {
        try {
            this.secretKey = KeyGenerator
                    .getInstance("HmacSHA256")
                    .generateKey();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .claims()
                .add(new HashMap<>())
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + (1000 * 60 * 30)))
                .and()
                .signWith(getSecretKey())
                .compact();
    }
}
