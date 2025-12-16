package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.PurchaseMapper;
import com.rockeven199.rmg.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService service;

    @Autowired
    private PurchaseMapper mapper;

    @GetMapping("/select_purchase")
    public JSONObject selectPurchase(@RequestParam("startIndex") Integer startIndex, @RequestParam("endIndex") Integer endIndex) {
        return service.selectPurchase(startIndex,endIndex);
    }

    @PutMapping("/update_purchase")
    public JSONObject updatePurchase(@RequestParam("id") Integer id, @RequestParam("yield") String yield, @RequestParam("value") String value) {
        return service.updatePurchase(id, yield, value);
    }

    @DeleteMapping("/delete_purchase/{id}")
    public JSONObject deletePurchase(@PathVariable("id") Integer id) {
        return service.deletePurchase(id);
    }

    @GetMapping("/insert_purchase")
    public JSONObject insertPurchase(@RequestParam("purchase_name") String name, @RequestParam("purchase_count") String count, @RequestParam("purchase_start_time") String start, @RequestParam("purchase_end_time") String end, @RequestParam("purchase_state") String state) {
        return service.insertPurchase(name, count, start, end, state);
    }

    @GetMapping("/query_keywords")
    public JSONObject queryKeywords(@RequestParam("keywords") String keywords) {
        return service.queryKeywords(keywords);
    }
}
