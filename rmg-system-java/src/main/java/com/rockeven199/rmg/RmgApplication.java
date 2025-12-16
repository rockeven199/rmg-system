package com.rockeven199.rmg;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RmgApplication {

    public static void main(String[] args) {
        SpringApplication.run(RmgApplication.class, args);
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~启动成功~~~~~~~~~~~~~~~~~~~~~~");
    }

}
