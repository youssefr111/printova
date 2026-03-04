package com.printova.management.service.user;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

public interface RoleService {
    ResponseEntity<?> getAllRoles();
    ResponseEntity<?> getRoleById(@NonNull Integer roleId);
    ResponseEntity<?> getUserRoles(Long userId);
    ResponseEntity<?> addRole(Long userId, String roleName);
    ResponseEntity<?> removeRole(Long userId, String roleName);
}