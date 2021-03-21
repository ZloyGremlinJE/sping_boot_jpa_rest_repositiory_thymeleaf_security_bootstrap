package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.rest;


import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.Role;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.RoleService;
import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/adminAPI")
public class AdminRestController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/list")
    public ResponseEntity<List<User>> listCustomers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User theUser) {
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
        for (Role r : theUser.getRoles()) {
            theUser.addRole(r);
        }
        userService.saveUser(theUser);
        return ResponseEntity.ok().build();

    }

    private void passwordChanged(User theUser, String encode) {
        encode = passwordEncoder.encode(encode);
        theUser.setPassword(encode);
    }

    @PostMapping("/delete")
    public ResponseEntity<Integer> deleteUser(@RequestBody  Integer theId) {
        userService.deleteUser(theId);
        return ResponseEntity.ok().build();
    }
}
