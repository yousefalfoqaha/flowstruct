package com.yousefalfoqaha.gjuplans.auth.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

// TODO: give site generator "SITE_GENERATOR" role with access to public endpoints only
@Component
public class SiteGeneratorFilter extends OncePerRequestFilter {

    @Value("${backend.api.key}")
    private String apiKey;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String headerApiKey = request.getHeader("X-Backend-Api-Key");

        if (Objects.equals(headerApiKey, apiKey)) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(apiKey, null, List.of());
            SecurityContextHolder.setContext(SecurityContextHolder.createEmptyContext());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
