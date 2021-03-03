package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service;



import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;

import java.util.List;

public interface UserService {

    List<User> getUsers();

    void saveUser(User theUser);

    User getUser(int theId);

    void deleteUser(int theId);

    User getUserByName(String s);

}
