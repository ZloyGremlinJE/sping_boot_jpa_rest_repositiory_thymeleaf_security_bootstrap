package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;

import java.util.Collection;

public interface RoleService {

    Collection<Role> findAll();

    Role getRole(int id);

}
