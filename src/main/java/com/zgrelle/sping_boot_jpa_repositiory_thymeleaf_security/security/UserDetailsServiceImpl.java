package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.security;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) {
        //return userRepository.getUserByName(s);
       return userRepository.findUserByEmail(s);
    }
}

