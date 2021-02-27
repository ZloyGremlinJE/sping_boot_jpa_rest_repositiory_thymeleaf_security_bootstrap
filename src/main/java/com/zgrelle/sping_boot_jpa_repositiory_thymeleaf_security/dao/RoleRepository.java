package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
