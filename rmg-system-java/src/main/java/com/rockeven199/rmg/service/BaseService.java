package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.BaseMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseService extends SetReturnMessage {
    @Autowired
    public BaseMapper mapper;

    //    获取选项
    public JSONObject get_options(String options_type) {
        return resultSuccessMessage("查询", mapper.get_options(options_type));
    }

    //    获取新闻内容
    public JSONObject get_news(String newsID) {
        return resultSuccessMessage("查询", mapper.get_news(newsID));
    }

    //    获取新闻内容
    public JSONObject get_news_list() {
        return resultSuccessMessage("查询", mapper.get_news_list());
    }

    //    获取存放位置选项
    public JSONObject get_position_options() {
        return resultSuccessMessage("查询", mapper.get_position_options());
    }

    //    获取数据总量
    public JSONObject get_data_total_count(String type) {
        return switch (type) {
            case "position" ->
                    resultSuccessMessage("查询", mapper.get_data_total_count("position_id", "rmg_position").toString());
            case "resource" ->
                    resultSuccessMessage("查询", mapper.get_data_total_count("resource_id", "rmg_resource").toString());
            case "purchase" ->
                    resultSuccessMessage("查询", mapper.get_data_total_count("purchase_id", "rmg_purchase").toString());
            case "suppliers" ->
                    resultSuccessMessage("查询", mapper.get_data_total_count("suppliers_id", "rmg_suppliers").toString());
            case "employee" ->
                    resultSuccessMessage("查询", mapper.get_data_total_count("employee_id", "rmg_employee").toString());
            default -> resultErrorMessage("查询", "请检查查询条件");
        };
    }
}
