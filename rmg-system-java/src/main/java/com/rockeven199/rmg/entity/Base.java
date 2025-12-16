package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Base {
    //    状态查询
    public String position_state;
    public String resource_state;
    public String purchase_state;
    //    个人信息
    public String gender;
    public String top_department;
    public String sub_department;
    public String employee_level;
    // 资产
    public String state;
    public String name;
    //采购
    public String purchase_yield;
    //位置
    public String position_id;
    public String position_name;
    public String position_state_code;
    //新闻
    public String news_id;
    public String news_title;
    public String news_pub_datetime;
    //性别
    public String person_sex;
}
