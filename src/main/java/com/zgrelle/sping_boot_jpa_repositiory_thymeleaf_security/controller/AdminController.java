package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/")
public class AdminController {


    @GetMapping("/main")
    public String getMainPage(Model model, Principal principal) {

        return "list_users_with_modal";
    }
}
