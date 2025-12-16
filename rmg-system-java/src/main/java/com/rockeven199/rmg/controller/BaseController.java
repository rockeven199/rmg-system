package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.service.BaseService;
import com.rockeven199.rmg.utils.SetReturnMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/base")
public class BaseController extends SetReturnMessage {
    @Autowired
    public BaseService service;


    //    获取选项
    @GetMapping("/get_options")
    public JSONObject get_options(@RequestParam("options_type") String options_type) {
        return service.get_options(options_type);
    }

    //    获取数据总量
    @GetMapping("/get_data_total_count")
    public JSONObject get_data_total_count(@RequestParam("type") String type) {
        return service.get_data_total_count(type);
    }

    //    获取存放位置选项
    @GetMapping("/get_position_options")
    public JSONObject get_position_options() {
        return service.get_position_options();
    }

    //    获取新闻
    @GetMapping("/news/{news_id}")
    public JSONObject get_news(@PathVariable String news_id, HttpServletResponse response) {
        return service.get_news(news_id);
    }

    //    新闻列表
    @GetMapping("/get_news_list")
    public JSONObject get_news_list() {
        return service.get_news_list();
    }
}
