package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao.UserRepository;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public void saveUser(User theUser) {

    }

    @Override
    public User getUser(int theId) {
        return null;
    }

    @Override
    public void deleteUser(int theId) {

    }

    @Override
    public User getUserByName(String s) {
        return null;
    }
}
