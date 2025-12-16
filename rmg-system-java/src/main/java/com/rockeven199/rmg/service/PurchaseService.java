package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.PurchaseMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService extends SetReturnMessage {
    @Autowired
    private PurchaseMapper mapper;

    public JSONObject selectPurchase(Integer startIndex, Integer endIndex) {
        return resultSuccessMessage("查询", mapper.selectPurchase(startIndex, endIndex));
    }

    public JSONObject updatePurchase(Integer id, String field, String value) {
        return resultSuccessMessage("修改", mapper.updatePurchase(id, field, value));
    }

    public JSONObject deletePurchase(Integer id) {
        return resultSuccessMessage("删除", mapper.deleteResource(id));
    }

    public JSONObject insertPurchase(String name, String count, String start, String end, String state) {
        return resultSuccessMessage("添加", mapper.insertResource(name, count, start, end, state));
    }

    public JSONObject queryKeywords(String keywords) {
        return resultSuccessMessage("查询", mapper.queryKeywords(keywords));
    }
}
