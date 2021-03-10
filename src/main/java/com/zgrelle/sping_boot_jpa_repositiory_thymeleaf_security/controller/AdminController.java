package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.controller;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.RoleService;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/list")
    public String listCustomers(Model theModel , Authentication authentication) {
        List<User> theUsers = userService.getUsers();
        theModel.addAttribute("users", theUsers);
        User theUser = new User();
        theModel.addAttribute("user", theUser);
        theModel.addAttribute("roles", roleService.findAll());
        String name = authentication.getName();
        User principalUser = userService.getUserByName(name);
        theModel.addAttribute("principal_user", principalUser);
        String roleString = principalUser.getRoles().stream().map(role -> role.getName().replaceAll("ROLE_",""))
                .collect(Collectors.joining(" "));
        theModel.addAttribute("principal_roles", roleString);
        return "bootstrap_test";//"list-users";
    }

    @GetMapping("/showFormForAdd")
    public String showFormForAdd(Model theModel) {
        User theUser = new User();
        theModel.addAttribute("user", theUser);
        theModel.addAttribute("roles", roleService.findAll());
        return "user-form";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") User theUser, @RequestParam("roles") String[] roles) {
        String encode = theUser.getPassword();
        if (theUser.getId() != 0) { // update user
            if (encode.isEmpty()) { //  password not changed
                theUser.setPassword(userService.getUser(theUser.getId()).getPassword());
            } else {
                passwordChanged(theUser, encode);
            }
        } else { //new user
            passwordChanged(theUser, encode);
        }

        theUser.getRoles().clear();
        for (String r : roles) {
            theUser.addRole(roleService.getRole(Integer.parseInt(r)));
        }

        userService.saveUser(theUser);
        return "redirect:/admin/list";
    }

    private void passwordChanged(User theUser, String encode) {
        encode = passwordEncoder.encode(encode);
        theUser.setPassword(encode);
    }

    @PostMapping("/showFormForUpdate")
    public String showFormForUpdate(@RequestParam("userId") int theId,
                                    Model theModel) {

        User theUser = userService.getUser(theId);
        theModel.addAttribute("user", theUser);
        theModel.addAttribute("roles", roleService.findAll());
        return "user-form";
    }

    @PostMapping("/delete")
    public String deleteUser(@RequestParam("userId") int theId) {
        userService.deleteUser(theId);
        return "redirect:/admin/list";
    }
}
