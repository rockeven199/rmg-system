package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.EmployeeMapper;
import com.rockeven199.rmg.service.EmployeeService;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/employee")
public class EmployeeController extends SetReturnMessage {
    @Autowired
    private EmployeeMapper mapper;

    @Autowired
    private EmployeeService service;

    @PostMapping("/select_employee")
    private JSONObject selectEmployee(@RequestParam("startIndex") Integer startIndex, @RequestParam("endIndex") Integer endIndex) {
        return service.selectEmployee(startIndex, endIndex);
    }

    @PutMapping("/update_employee")
    private JSONObject updateEmployee(@RequestParam("yield") String yield, @RequestParam("value") String value, @RequestParam("id") Integer id) {
        return service.updateEmployee(yield, value, id);
    }

    @DeleteMapping("/delete_employee/{id}")
    public JSONObject deleteEmployee(@PathVariable("id") Integer id) {
        return service.deleteEmployee(id);
    }

    @GetMapping("/insert_employee")
    public JSONObject insertEmployee(@RequestParam("employee_name") String name, @RequestParam("employee_age") Integer age, @RequestParam("employee_sex") String sex, @RequestParam("employee_address") String address, @RequestParam("employee_worked_time") String worked_time, @RequestParam("employee_department") String department, @RequestParam("employee_second_department") String second_department, @RequestParam("employee_job") String job, @RequestParam("employee_level") String level, @RequestParam("employee_phone") String phone, @RequestParam("employee_card_id") String card_id, @RequestParam("employee_email") String email) {
        return service.insertEmployee(name, age, sex, address, worked_time, department, second_department, job, level, phone, card_id, email);
    }

    @GetMapping("/query_keywords")
    public JSONObject queryKeywords(@RequestParam("keywords") String keywords) {
        return service.queryKeywords(keywords);
    }
}
