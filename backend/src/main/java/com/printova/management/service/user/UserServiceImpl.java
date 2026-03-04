package com.printova.management.service.user;

import com.printova.management.dto.user.UserDTO;
import com.printova.management.dto.user.UpdateUserRequest;
import com.printova.management.entity.user.User;
import com.printova.management.entity.user.Role;
import com.printova.management.repository.user.UserRepository;
import com.printova.management.repository.user.RoleRepository;
import com.printova.management.dto.user.UserDTOMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, UserDTOMapper userDTOMapper, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
        this.roleRepository = roleRepository;
    }

    @Override
    public ResponseEntity<?> updateUser(Long userId, UpdateUserRequest request) {
        if (userId == null){
            return ResponseEntity.badRequest().body(Map.of("error", "User ID is required"));
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        if (request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null && !request.getLastName().isEmpty()) {
            user.setLastName(request.getLastName());
        }
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (userRepository.findByEmail(request.getEmail()).isPresent() &&
                    !user.getEmail().equals(request.getEmail())) {
                return ResponseEntity.status(400).body(Map.of("error", "Email already in use"));
            }
            user.setEmail(request.getEmail());
        }
        if (request.getAddress() != null && !request.getAddress().isEmpty()) {
            user.setAddress(request.getAddress());
        }
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            var existingUserWithPhone = userRepository.findByPhone(request.getPhoneNumber());

            if (existingUserWithPhone.isPresent()
                    && !existingUserWithPhone.get().getEmail().equals(user.getEmail())) {
                return ResponseEntity.status(400).body(Map.of("error", "Phone Number already in use"));
            }

            user.setPhone(request.getPhoneNumber());
        }

        // ================== ADMIN ONLY ROLE UPDATE ==================
        var auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = auth.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .anyMatch(r -> r.equals("ROLE_ADMIN"));

        if (isAdmin && request.getRoles() != null && !request.getRoles().isEmpty()) {
            Set<Role> newRoles = request.getRoles().stream()
                    .map(roleName -> roleRepository
                            .findByRoleNameIgnoreCase(roleName)
                            .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                    .collect(Collectors.toSet());

            user.getRoles().addAll(newRoles);
        }
        // ============================================================

        userRepository.save(user);
        return ResponseEntity.ok(userDTOMapper.apply(user));
    }

    @Override
    public ResponseEntity<?> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @Override
    public ResponseEntity<?> getUserById(Long userId) {
        if (userId == null){
            return ResponseEntity.badRequest().body(Map.of("error", "User ID is required"));
        }
        
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        return ResponseEntity.ok(userDTOMapper.apply(user));
    }
}