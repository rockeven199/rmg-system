package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private Integer employee_id;
    private String employee_name;
    private Integer employee_age;
    private String employee_sex;
    private String employee_address;
    private String employee_worked_time;
    private String employee_department;
    private String employee_second_department;
    private String employee_job;
    private String employee_level;
    private String employee_phone;
    private String employee_card_id;
    private String employee_email;
}
