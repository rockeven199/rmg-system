package com.rockeven199.rmguser;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.rockeven199.rmguser.mapper")
public class RmgUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(RmgUserApplication.class, args);
	}

}
