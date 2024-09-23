package com.example.personalweb.controllers;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainPageController {

    @GetMapping("/")
    public String homePage(Model model) {
        return "mainPage"; 
    }


    
}
