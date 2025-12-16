package com.rockeven199.rmg.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Support")
public class SupportController {

    @GetMapping("/get_Mail")
    public void getMail() throws Exception {

    }
}
