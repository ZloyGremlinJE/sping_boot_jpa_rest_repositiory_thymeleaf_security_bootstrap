package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;

import java.util.List;

public interface RoleService {

    List<Role> findAll();

    Role getRole(int id);

}
