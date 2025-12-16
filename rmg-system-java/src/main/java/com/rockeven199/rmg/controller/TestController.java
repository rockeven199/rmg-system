package com.rockeven199.rmg.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/test_controller")
@RestController
public class TestController {

    @RequestMapping("/test")
    public void test() {
    }
}