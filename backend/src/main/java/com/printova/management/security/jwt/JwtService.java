package com.printova.management.security.jwt;

import com.printova.management.exceptions.InvalidTokenException;
import com.printova.management.entity.user.User;
import com.printova.management.security.utility.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {


    private final Key accessKey;

    public JwtService() {
        this.accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SecurityConstants.JWT_ACCES_SECRET_KEY));
    }

    public String getEmailFromJwtToken(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (JwtException e) {
            throw new InvalidTokenException("Invalid token");
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            return extractClaim(token, claimsResolver, accessKey);
        } catch (JwtException e) {
            throw new InvalidTokenException("Invalid token");
        }
    }

    public String generateJwtToken(User userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userDetails.getEmail());
        claims.put("type", "access");
        return buildToken(claims, userDetails, SecurityConstants.JWT_ACCES_EXPIRATION, accessKey);
    }

    private String buildToken(Map<String, Object> claims, User userDetails, long expirationTime, Key key) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, User userDetails) {
        try {
            String email = extractClaim(token, Claims::getSubject);
            String type = extractClaim(token, claims -> claims.get("type", String.class));
            if (!"access".equals(type)) {
                throw new InvalidTokenException("Token type is not access.");
            }
            return email != null && email.equals(userDetails.getEmail()) && !isTokenExpired(token);
        } catch (JwtException e) {
            throw new InvalidTokenException("Invalid token");
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            return extractClaim(token, Claims::getExpiration, accessKey).before(new Date());
        } catch (JwtException e) {
            throw new InvalidTokenException("Invalid token");
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver, Key key) {
        Claims claims = extractAllClaims(token, key);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token, Key key) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}