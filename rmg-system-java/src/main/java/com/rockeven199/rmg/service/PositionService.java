package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.PositionMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PositionService extends SetReturnMessage {
    @Autowired
    private PositionMapper mapper;


    public JSONObject insertPosition(String name, String status, String desc, Integer position_state_flag) {
        return resultSuccessMessage("添加", mapper.insertPosition(name, status, desc, position_state_flag));
    }


    public JSONObject deletePosition(String name) {
        return mapper.deletePosition(name) ? resultSuccessMessage("删除", mapper.deletePosition(name)) : resultErrorMessage("删除", "当前位置正在被占用！");
    }


    public JSONObject updatePosition(String field, String value, Integer id) {
        return resultSuccessMessage("修改", mapper.updatePosition(field, value, id));
    }


    public JSONObject selectPosition(Integer startIndex, Integer endIndex) {
        return resultSuccessMessage("查询", mapper.selectPosition(startIndex, endIndex));
    }

    public JSONObject queryKeywords(String keywords) {
        return resultSuccessMessage("查询", mapper.queryKeywords(keywords));
    }
}
