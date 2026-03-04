package com.printova.management.service.auth;

import com.printova.management.dto.auth.*;
import com.printova.management.dto.user.UserDTOMapper;
import com.printova.management.exceptions.InvalidTokenException;
import com.printova.management.exceptions.ResourceNotFoundException;
import com.printova.management.entity.auth.RefreshToken;
import com.printova.management.entity.auth.Token;
import com.printova.management.entity.auth.TokenType;
import com.printova.management.entity.user.User;
import com.printova.management.entity.user.Role;
import com.printova.management.repository.auth.TokenRepository;
import com.printova.management.repository.user.UserRepository;
import com.printova.management.repository.user.RoleRepository;
import com.printova.management.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserDTOMapper userDTOMapper;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final RoleRepository roleRepository;

    public AuthServiceImpl(UserRepository userRepository, TokenRepository tokenRepository,
                           JwtService jwtService, PasswordEncoder passwordEncoder,
                           UserDTOMapper userDTOMapper, AuthenticationManager authenticationManager,
                           RefreshTokenService refreshTokenService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
        this.roleRepository = roleRepository;
    }

    @Override
    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use: " + request.getEmail());
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use: " + request.getPhone());
        }

        Role customerRole = roleRepository.findByRoleNameIgnoreCase("CUSTOMER")
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with name CUSTOMER"));
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .address(request.getAddress())
                .roles(Set.of(customerRole))
                .build();

        if (user == null) {
            throw new IllegalArgumentException("Failed to create user");
        }
        User savedUser = userRepository.save(user);
        String accessToken = jwtService.generateJwtToken(savedUser);
        String refreshToken = refreshTokenService.generateRefreshToken(savedUser);
        saveUserToken(savedUser, accessToken);
        AuthResponse response = AuthResponse.builder()
                .userDTO(userDTOMapper.apply(savedUser))
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> login(AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email must be provided");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password must be provided");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        revokeAllUserTokens(user);
        String jwtToken = jwtService.generateJwtToken(user);
        String refreshToken = refreshTokenService.generateRefreshToken(user);
        saveUserToken(user, jwtToken);

        AuthResponse logInResponse = AuthResponse.builder()
                .userDTO(userDTOMapper.apply(user))
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();

        return ResponseEntity.ok(logInResponse);
    }

    @Override
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException("Missing or invalid Authorization header");
        }

        String refreshToken = authHeader.substring(7);
        refreshTokenService.validateRefreshToken(refreshToken);
        String email = jwtService.getEmailFromJwtToken(refreshToken);
        if (email == null) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        revokeAllUserTokens(user);
        String newAccessToken = jwtService.generateJwtToken(user);
        String newRefreshToken = refreshTokenService.generateRefreshToken(user);
        saveUserToken(user, newAccessToken);

        AuthResponse authResponse = AuthResponse.builder()
                .userDTO(userDTOMapper.apply(user))
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
        return ResponseEntity.ok(authResponse);
    }

    @Override
    public ResponseEntity<?> changePassword(ChangePasswordRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        if (request.getOldPassword() == null || request.getOldPassword().isBlank() ||
            request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            throw new IllegalArgumentException("Old password and new password must be provided");
        }

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        revokeAllUserTokens(user);

        String newAccessToken = jwtService.generateJwtToken(user);
        String newRefreshToken = refreshTokenService.generateRefreshToken(user);
        saveUserToken(user, newAccessToken);

        AuthResponse response = AuthResponse.builder()
                .userDTO(userDTOMapper.apply(user))
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();

        return ResponseEntity.ok(response);
    }

    // @Override
    // public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    //     final String authHeader = request.getHeader("Authorization");
    //     if (authHeader == null || !authHeader.startsWith("Bearer ")) { return ResponseEntity.badRequest().build();}
    //     final String token = authHeader.substring(7);
    //     var storedToken = tokenRepository.findByToken(token).orElse(null);
    //     if (storedToken != null) {
    //         storedToken.setExpired(true);
    //         storedToken.setRevoked(true);
    //         tokenRepository.save(storedToken);
    //     }
    //     return ResponseEntity.ok().build();
    // }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.ACCESS)
                .expired(false)
                .revoked(false)
                .build();
        if (token != null) {
            tokenRepository.save(token);
        }
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokensByUser(user.getUserId());
        if (!validUserTokens.isEmpty()) {
            validUserTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });
            tokenRepository.saveAll(validUserTokens);
        }
        List<RefreshToken> validRefreshTokens = refreshTokenService.fetchAllRefreshTokenByUserId(user.getUserId().longValue());
        if (!validRefreshTokens.isEmpty()) {
            validRefreshTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });
            refreshTokenService.saveAll(validRefreshTokens);
        }
    }

    @Override
    public ResponseEntity<?> verifyCode(String email, String code) {
        throw new UnsupportedOperationException("verifyCode method is not implemented yet");
    }
}