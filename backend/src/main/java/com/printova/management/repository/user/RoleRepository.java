package com.printova.management.repository.user;

import com.printova.management.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleId(Integer roleId);
    Optional<Role> findByRoleNameIgnoreCase(String roleName);
}