package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.rest;


import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.RoleService;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/adminAPI")
public class AdminRestController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @GetMapping("/list")
    public List<User> listCustomers() {
        return userService.getUsers();

//         List<User> theUsers = userService.getUsers();
//        theModel.addAttribute("users", theUsers);
//        User theUser = new User();
//        theModel.addAttribute("user", theUser);
//        theModel.addAttribute("roles", roleService.findAll());
//        String name = authentication.getName();
//        User principalUser = userService.getUserByName(name);
//        theModel.addAttribute("principal_user", principalUser);
//        String roleString = principalUser.getRoles().stream().map(role -> role.getName().replaceAll("ROLE_",""))
//                .collect(Collectors.joining(" "));
//        theModel.addAttribute("principal_roles", roleString);
//        return "list_users_with_modal";
    }

}
