package com.printova.management.controller.user;

import com.printova.management.dto.user.*;
import com.printova.management.service.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolesController {

    private final RoleService roleService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{roleId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> getRoleById(@PathVariable(required = false) Integer roleId) {
        if (roleId == null) {
            return ResponseEntity.badRequest().build();
        }
        return roleService.getRoleById(roleId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addRole(
            @PathVariable Long userId,
            @RequestBody RoleRequest request
    ) {
        return roleService.addRole(userId, request.getRoleName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> removeRole(
            @PathVariable Long userId,
            @RequestBody RoleRequest request
    ) {
        return roleService.removeRole(userId, request.getRoleName());
    }

    @PreAuthorize("hasRole('ADMIN') or #userId == principal.userId")
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserRoles(@PathVariable Long userId) {
        return roleService.getUserRoles(userId);
    }
}