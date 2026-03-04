package com.printova.management.service.auth;

import com.printova.management.exceptions.ExpiredTokenException;
import com.printova.management.exceptions.InvalidTokenException;
import com.printova.management.exceptions.ResourceNotFoundException;
import com.printova.management.exceptions.RevokedTokenException;
import com.printova.management.entity.auth.RefreshToken;
import com.printova.management.entity.user.User;
import com.printova.management.repository.auth.RefreshTokenRepository;
import com.printova.management.security.utility.SecurityConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final Key refreshKey;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SecurityConstants.JWT_REFRESH_SECRET_KEY));
    }

    @Override
    public String generateRefreshToken(User user) {
        Date expirationDate = new Date(System.currentTimeMillis() + SecurityConstants.JWT_REFRESH_EXPIRATION);
        String token = Jwts.builder()
                .setClaims(new HashMap<String, Object>() {{ put("type", "refresh"); }})
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(refreshKey, SignatureAlgorithm.HS256)
                .compact();
        RefreshToken refreshToken = RefreshToken.builder()
                .refreshToken(token)
                .expired(false)
                .revoked(false)
                .issuedAt(new Date())
                .expiresAt(expirationDate)
                .user(user)
                .build();
        if (refreshToken != null) {
            refreshTokenRepository.save(refreshToken);
        }
        return token;
    }

    @Override
    public RefreshToken fetchRefreshTokenByToken(String refreshToken) {
        return refreshTokenRepository.fetchByToken(refreshToken)
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token not found"));
    }

    @Override
    public List<RefreshToken> fetchAllRefreshTokenByUserId(Long userId) {
        return refreshTokenRepository.fetchAllRefreshTokenByUserId(userId);
    }

    @Override
    public void validateRefreshToken(String refreshToken) {
        RefreshToken currentRefreshToken = fetchRefreshTokenByToken(refreshToken);
        if (currentRefreshToken.isExpired() || currentRefreshToken.getExpiresAt().before(new Date())) {
            throw new ExpiredTokenException("Refresh token is expired");
        }
        if (currentRefreshToken.isRevoked()) {
            throw new RevokedTokenException("Refresh token is revoked");
        }
        try {
            Jwts.parserBuilder()
                    .setSigningKey(refreshKey)
                    .build()
                    .parseClaimsJws(refreshToken);
        } catch (Exception e) {
            throw new InvalidTokenException("Invalid refresh token");
        }
    }

    @Override
    public void saveAll(List<RefreshToken> refreshTokens) {
        if (refreshTokens != null && !refreshTokens.isEmpty()) {
            refreshTokenRepository.saveAll(refreshTokens);
        }
    }
}