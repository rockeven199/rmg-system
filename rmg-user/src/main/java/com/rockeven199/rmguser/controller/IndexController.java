package com.rockeven199.rmguser.controller;

import com.rockeven199.rmguser.entity.report_item;
import com.rockeven199.rmguser.mapper.IndexMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class IndexController {
    @Autowired
    public IndexMapper mapper;

    @GetMapping("/changeData")
    public Boolean UpdateData(@RequestParam report_item report_entity) {
        return mapper.UpdateData(report_entity);
    }
}
