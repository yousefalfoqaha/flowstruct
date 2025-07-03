package com.yousefalfoqaha.gjuplans.auth;

import com.yousefalfoqaha.gjuplans.user.service.AppUserDetailsService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final AppUserDetailsService appUserDetailsService;

    @Value("${jwt.cookieSecure}")
    private boolean cookieSecure;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (request.getCookies() == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = Arrays.stream(request.getCookies())
                .filter(c -> "accessToken".equals(c.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String username;
        try {
            username = jwtService.extractUserName(token);
        } catch (JwtException e) {
            ResponseCookie emptyCookie = ResponseCookie.from("accessToken")
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(0)
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, emptyCookie.toString());

            filterChain.doFilter(request, response);
            return;
        }

        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = appUserDetailsService.loadUserByUsername(username);

        if (!jwtService.validateToken(token, userDetails)) {
            ResponseCookie emptyCookie = ResponseCookie.from("accessToken")
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(0)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, emptyCookie.toString());

            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.setContext(SecurityContextHolder.createEmptyContext());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
