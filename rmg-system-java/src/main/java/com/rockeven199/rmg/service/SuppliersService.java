package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.SuppliersMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuppliersService extends SetReturnMessage {
    @Autowired
    private SuppliersMapper mapper;

    public JSONObject selectSuppliers(Integer startIndex, Integer endIndex) {
        return resultSuccessMessage("查询", mapper.selectSuppliers(startIndex, endIndex));
    }

    public JSONObject updateSuppliers(String field, String value, Integer id) {
        return resultSuccessMessage("修改", mapper.updateSuppliers(field, value, id));
    }

    public JSONObject deleteSuppliers(Integer id) {
        return resultSuccessMessage("删除", mapper.deleteSuppliers(id));
    }

    public JSONObject insertSuppliers(String name, String phone, String address, String email, String description, String country) {
        return resultSuccessMessage("添加", mapper.insertSuppliers(name, phone, address, email, description, country));
    }

    public JSONObject queryKeywords(String keywords) {
        return resultSuccessMessage("查询", mapper.queryKeywords(keywords));
    }
}
