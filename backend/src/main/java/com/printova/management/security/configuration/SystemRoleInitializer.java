package com.printova.management.security.configuration;

import com.printova.management.entity.user.Role;
import com.printova.management.entity.user.User;
import com.printova.management.repository.user.RoleRepository;
import com.printova.management.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class SystemRoleInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // 1️⃣ Ensure ADMIN role exists
        Role adminRole = roleRepository.findByRoleNameIgnoreCase("ADMIN")
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .roleName("ADMIN")
                            .build();

                    if (role == null){
                        throw new RuntimeException("Failed to create ADMIN role");
                    }
                    return roleRepository.save(role);
                });

        // 2️⃣ Ensure MANAGER role exists
        Role managerRole = roleRepository.findByRoleNameIgnoreCase("MANAGER")
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .roleName("MANAGER")
                            .build();
                    if (role == null){
                        throw new RuntimeException("Failed to create MANAGER role");
                    }
                    return roleRepository.save(role);
                });
        // 3️⃣ Ensure DELIVERY role exists
        Role deliveryRole = roleRepository.findByRoleNameIgnoreCase("DELIVERY")
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .roleName("DELIVERY")
                            .build();
                    if (role == null){
                        throw new RuntimeException("Failed to create DELIVERY role");
                    }
                    return roleRepository.save(role);
                });
        // 4️⃣ Ensure TECHNICIAN role exists
        Role technicianRole = roleRepository.findByRoleNameIgnoreCase("TECHNICIAN")
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .roleName("TECHNICIAN")
                            .build();
                    if (role == null){
                        throw new RuntimeException("Failed to create TECHNICIAN role");
                    }
                    return roleRepository.save(role);
                });

        // 5️⃣ Ensure CUSTOMER role exists
        Role customerRole = roleRepository.findByRoleNameIgnoreCase("CUSTOMER")
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .roleName("CUSTOMER")
                            .build();
                    if (role == null){
                        throw new RuntimeException("Failed to create CUSTOMER role");
                    }
                    return roleRepository.save(role);
                });

        // 6️⃣ Ensure admin user exists
        User adminUser = userRepository.findByEmail("admin@printova.com")
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .firstName("Printova")
                            .lastName("Admin")
                            .email("admin@printova.com")
                            .password(passwordEncoder.encode("password"))
                            .address("123 Admin St")
                            .phone("1234567890")
                            .roles(new HashSet<>())
                            .build();
                    if (newUser == null){
                        throw new RuntimeException("Failed to create admin user");
                    }
                    return userRepository.save(newUser);
                });

        // 7️⃣ Ensure admin has ADMIN role
        if (!adminUser.getRoles().contains(adminRole)) {
            adminUser.getRoles().add(adminRole);
        }

        // 8️⃣ Assign CUSTOMER role to users with no roles
        List<User> users = userRepository.findAll();

        for (User user : users) {
            if (user.getRoles() == null || user.getRoles().isEmpty()) {
                user.getRoles().add(customerRole);
            }
        }

        userRepository.saveAll(users);
    }
}