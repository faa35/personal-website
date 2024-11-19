package com.example.personalweb.controllers;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainPageController {

    @Value("${LAST_FM_API_KEY}")
    private String lastFmApiKey;

    
    @Value("${LAST_FM_USERNAME}")
    private String lastFmUsername;

    @GetMapping("/")
    public String homePage(Model model) {

        System.out.println("Our last fm api key: " + lastFmApiKey); // Debugging the API key value(reload the page to get this printed in the terminal)
        model.addAttribute("lastFmApiKey", lastFmApiKey);

        model.addAttribute("lastFmUsername", lastFmUsername);
        System.out.println("Our user name is: " + lastFmUsername); // Debugging the API key value(reload the page to get this printed in the terminal)

        return "mainPage"; 
    }


    
}
