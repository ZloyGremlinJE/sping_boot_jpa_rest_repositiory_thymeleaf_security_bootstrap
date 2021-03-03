package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao.RoleRepository;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Collection;

@Service
public class RoleServiceImpl implements RoleService{

    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    @Override
    public Collection<Role> findAll() {
        return null;
    }

    @Override
    public Role getRole(int id) {
        return null;
    }
}
