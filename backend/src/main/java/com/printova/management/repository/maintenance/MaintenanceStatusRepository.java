package com.printova.management.repository.maintenance;

import com.printova.management.entity.maintenance.MaintenanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaintenanceStatusRepository extends JpaRepository<MaintenanceStatus, Integer> {
    Optional<MaintenanceStatus> findByMaintenanceStatusIgnoreCase(String maintenanceStatus);
}