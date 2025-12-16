package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.sql.Blob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String username;
    private String password;
    private String header_img;
    private String level;
    private String phone_number;
    private String email;
    private String department;
    private String job;
    private String second_department;
    private String sex;
}
