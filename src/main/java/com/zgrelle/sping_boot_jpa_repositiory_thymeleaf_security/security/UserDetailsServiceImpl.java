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
       return userRepository.findUserByUserName(s);
    }
}

//    @Override
//    @Transactional
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//without implements UserDetail and GrantedAuthority
        /* User currentUser = userDAO.getUserByName(s);
        if (currentUser == null) {
            throw new UsernameNotFoundException("Unknown user: " + s);
        }

        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username(currentUser.getUserName())
                .password(currentUser.getPassword())
                .roles(currentUser.getRoles().stream().map(Role::getName).toArray(String[]::new))
                .build();
        return user;*/
//       return userDAO.getUserByName(s);
//    }
