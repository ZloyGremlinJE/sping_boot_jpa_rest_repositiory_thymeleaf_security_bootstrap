package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.rest;


import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userrest")
public class UserRest {

    @Autowired
    private UserService userService;

    @GetMapping("/getUser")
    public User getUser(Authentication authentication) {
        String name = authentication.getName();
        return userService.getUserByName(name);
    }


}
