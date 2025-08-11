package com.yousefalfoqaha.gjuplans.auth.filter;

import com.yousefalfoqaha.gjuplans.auth.service.AppUserDetailsService;
import com.yousefalfoqaha.gjuplans.auth.service.CookieService;
import com.yousefalfoqaha.gjuplans.auth.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
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
    private final CookieService cookieService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        response.setHeader("X-Auth-Expired", "false");

        if (request.getCookies() == null) {
            System.out.println("Request cookies were null");
            filterChain.doFilter(request, response);
            return;
        }

        String token = Arrays.stream(request.getCookies())
                .filter(c -> "accessToken".equals(c.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (token == null) {
            System.out.println("Access token was null");
            filterChain.doFilter(request, response);
            return;
        }

        String username;
        try {
            username = jwtService.extractUserName(token);
        } catch (JwtException e) {
            cookieService.clearAuthCookie(response);
            System.out.println("Username not found in access token");

            filterChain.doFilter(request, response);
            return;
        }

        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            System.out.println("Token username was null, but the authentication instance isnt, continue filter");
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = appUserDetailsService.loadUserByUsername(username);

        if (!jwtService.validateToken(token, userDetails)) {
            System.out.println("Token is ultimately invalid");
            cookieService.clearAuthCookie(response);
            response.setHeader("X-Auth-Expired", "true");

            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("Creating new authentication instance via token");
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
