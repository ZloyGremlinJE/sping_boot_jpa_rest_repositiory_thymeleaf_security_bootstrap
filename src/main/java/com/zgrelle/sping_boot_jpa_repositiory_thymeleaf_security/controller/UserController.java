package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.controller;


import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/showFormUser")
    public String showFormUser(Model theModel, Authentication authentication) {
        String name = authentication.getName();
        theModel.addAttribute("user", userService.getUserByName(name));
        return "user_readonly";

    }

    @GetMapping("/getUser")
    public User getUser(Model theModel, Authentication authentication) {
        String name = authentication.getName();
        //theModel.addAttribute("user", userService.getUserByName(name));

        //return "user_readonly";"user-no-editable-form";
        return userService.getUserByName(name);
    }


}
