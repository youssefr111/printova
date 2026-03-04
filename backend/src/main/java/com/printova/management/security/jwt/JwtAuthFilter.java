package com.printova.management.security.jwt;

import com.printova.management.exceptions.ExpiredTokenException;
import com.printova.management.exceptions.InvalidTokenException;
import com.printova.management.exceptions.RevokedTokenException;
import com.printova.management.entity.auth.TokenType;
import com.printova.management.entity.user.User;
import com.printova.management.repository.auth.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
                try {
                    String path = request.getServletPath();
                    if (path.equals("/") || path.equals("/index.html")
                            || path.startsWith("/css/")
                            || path.startsWith("/js/")
                            || path.startsWith("/img/")
                            || path.startsWith("/webjars/")
                            || path.startsWith("/swagger-ui/")
                            || path.startsWith("/v3/api-docs/")
                            || path.equals("/favicon.ico")
                            || "OPTIONS".equalsIgnoreCase(request.getMethod())
                    ) {
                        filterChain.doFilter(request, response);    
                        return;
                    }

                    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    String jwt = authHeader.substring(7);
                    String email = jwtService.getEmailFromJwtToken(jwt);
                    if (email == null) {
                        throw new InvalidTokenException("Invalid token: Unable to extract email.");
                    }

                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        User userDetails = (User) userDetailsService.loadUserByUsername(email);
                        boolean isTokenValid = tokenRepository.findByToken(jwt)
                                .map(t -> {
                                    if (t.isExpired()) {
                                        throw new ExpiredTokenException("Token has expired.");
                                    }
                                    if (t.isRevoked()) {
                                        throw new RevokedTokenException("Token has been revoked.");
                                    }
                                    if (t.getTokenType() != TokenType.ACCESS) {
                                        throw new InvalidTokenException("Token type is not access.");
                                    }
                                    return true;
                                })
                                .orElseThrow(() -> new InvalidTokenException("Token not found in repository."));

                        if (!jwtService.isTokenValid(jwt, userDetails)) {
                            throw new InvalidTokenException("Token validation failed.");
                        }

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                } catch (ExpiredTokenException e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Token has expired");
                    return;
                }


        filterChain.doFilter(request, response);
    }
}