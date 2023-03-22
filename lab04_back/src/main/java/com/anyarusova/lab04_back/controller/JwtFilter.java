package com.anyarusova.lab04_back.controller;

import com.anyarusova.lab04_back.model.JwtAuthentication;
import com.anyarusova.lab04_back.services.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Component
public class JwtFilter extends GenericFilterBean {
    private static final String AUTHORIZATION = "Authorization";

    private JwtUtil jwtProvider;

    @Autowired
    public JwtFilter(JwtUtil jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc)
            throws IOException, ServletException {
        final String token = getTokenFromRequest((HttpServletRequest) request);
        if (token != null && jwtProvider.validateToken(token)) {
            final JwtAuthentication jwtInfoToken = new JwtAuthentication(true, request.getParameter("login"));
            SecurityContextHolder.getContext().setAuthentication(jwtInfoToken);
        }
        fc.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        try {
            final String authHeader = request.getHeader(AUTHORIZATION);
            if (authHeader != null) {
                final String[] bearer = authHeader.split(" ");
                if (bearer.length == 2 && bearer[0].equals("Bearer")) {
                    return bearer[1];
                }
            }
            return null;
        } catch (StringIndexOutOfBoundsException e) {
            return null;
        }
    }
}
