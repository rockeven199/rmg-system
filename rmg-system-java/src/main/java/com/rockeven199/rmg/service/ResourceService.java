package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.ResourceMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceService extends SetReturnMessage {
    @Autowired
    private ResourceMapper mapper;

    public JSONObject updateResource(String field, String value, Integer id) {
        return resultSuccessMessage("修改", mapper.updateResource(field, value, id));
    }

    public JSONObject selectResource(Integer startIndex,Integer endIndex) {
        return resultSuccessMessage("查询",mapper.selectResource(startIndex,endIndex));
    }

    public JSONObject deleteResource(Integer id) {
        return resultSuccessMessage("删除", mapper.deleteResource(id));
    }

    public JSONObject insertResource(String name, String count, String position, String state) {
        return resultSuccessMessage("添加", mapper.insertResource(name, count, position, state));
    }

    public JSONObject queryKeywords(String keywords) {
        return resultSuccessMessage("查询", mapper.queryKeywords(keywords));
    }

}
