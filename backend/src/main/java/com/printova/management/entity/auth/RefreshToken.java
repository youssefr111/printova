package com.printova.management.entity.auth;

import com.printova.management.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String refreshToken;
    private boolean expired;
    private boolean revoked;
    private Date issuedAt;
    private Date expiresAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}