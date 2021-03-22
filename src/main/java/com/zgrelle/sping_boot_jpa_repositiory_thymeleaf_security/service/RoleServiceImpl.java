package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao.RoleRepository;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRole(int id) {
        Optional<Role> result = roleRepository.findById(id);
        Role theRole;
        if (result.isPresent()) {
            theRole = result.get();
        } else {
            // we didn't find the user
            throw new RuntimeException("Did not find user id - " + id);
        }
        return theRole;
    }
}
