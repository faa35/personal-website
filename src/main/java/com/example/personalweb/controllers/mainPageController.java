package com.example.personalweb.controllers;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainPageController {

    @Value("${LAST_FM_API_KEY}")
    private String lastFmApiKey;

    @GetMapping("/")
    public String homePage(Model model) {
        System.out.println("Our last fm api key: " + lastFmApiKey); // Debugging the API key value(reload the page to get this printed)
        model.addAttribute("lastFmApiKey", lastFmApiKey);
        return "mainPage"; 
    }


    
}
