package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.EmployeeMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService extends SetReturnMessage {
    @Autowired
    private EmployeeMapper mapper;

    public JSONObject selectEmployee(Integer startIndex,Integer endIndex) {
        return resultSuccessMessage("查询", mapper.selectEmployee(startIndex,endIndex));
    }

    public JSONObject updateEmployee( String yield, String value,Integer id) {
        return resultSuccessMessage("修改", mapper.updateEmployee( yield, value,id));
    }

    public JSONObject deleteEmployee(Integer id) {
        return resultSuccessMessage("删除", mapper.deleteEmployee(id));
    }

    public JSONObject insertEmployee(String name, Integer age, String sex, String address, String time, String department, String second_department, String job, String level, String phone, String card_id, String email) {
        return resultSuccessMessage("添加", mapper.insertEmployee(name, age,  sex,  address,  time,  department,  second_department,  job,  level,  phone,  card_id, email));
    }
    public JSONObject queryKeywords(String keywords) {
        return resultSuccessMessage("查询", mapper.queryKeywords(keywords));
    }
}
