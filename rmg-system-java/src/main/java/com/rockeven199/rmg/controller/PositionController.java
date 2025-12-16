package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.PositionMapper;
import com.rockeven199.rmg.service.PositionService;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/position")
public class PositionController extends SetReturnMessage {

    @Autowired
    public PositionService service;

    @Autowired
    public PositionMapper mapper;

    @GetMapping("/insert_position")
    public JSONObject insertPosition(@RequestParam("position_name") String position_name, @RequestParam("position_state") String position_state, @RequestParam("position_desc") String position_desc) {

        int code = 5;
        if (position_state.equals("正常")) {
            code = 0;
        } else if (position_state.equals("已满")) {
            code = 1;
        } else if (position_state.equals("空置")) {
            code = 2;
        } else {
            code = 3;
        }
        return service.insertPosition(position_name, position_state, position_desc, code);
    }

    @DeleteMapping("/delete_position/{name}")
    public JSONObject deletePosition(@PathVariable("name") String name) {
        return service.deletePosition(name);
    }

    @PutMapping("/update_position")
    public void updatePosition(@RequestParam("yield") String yield, @RequestParam("value") String value, @RequestParam("id") Integer id) {
        service.updatePosition(yield, value, id);
    }

    @GetMapping("/select_position")
    public JSONObject selectPosition(@RequestParam("startIndex") Integer startIndex, @RequestParam("endIndex") Integer endIndex) {
        return service.selectPosition(startIndex, endIndex);
    }

    @GetMapping("/query_keywords")
    public JSONObject queryKeywords(@RequestParam("keywords") String keywords) {
        return service.queryKeywords(keywords);
    }
}
