package com.aiwebsitebuilder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @GetMapping("/status")
    public String status() {
        return "AI Service is ready to generate websites";
    }
}
