package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;

import java.util.List;

public interface UserService {

    List<User> getUsers();

    void saveUser(User user);

    User getUser(int id);

    void deleteUser(int id);

    User getUserByName(String s);

}
