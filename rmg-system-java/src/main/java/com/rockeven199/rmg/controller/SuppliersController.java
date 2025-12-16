package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.SuppliersMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import com.rockeven199.rmg.service.SuppliersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/suppliers")
public class SuppliersController extends SetReturnMessage {
    @Autowired
    private SuppliersService service;

    @GetMapping("/select_suppliers")
    public JSONObject selectSuppliers(@RequestParam("startIndex") Integer startIndex, @RequestParam("endIndex") Integer endIndex) {
        return service.selectSuppliers(startIndex, endIndex);
    }

    @PutMapping("/update_suppliers")
    public JSONObject updateSuppliers(@RequestParam("yield") String yield, @RequestParam("value") String value, @RequestParam("id") Integer id) {
        return service.updateSuppliers(yield, value, id);
    }

    @DeleteMapping("/delete_suppliers/{id}")
    public JSONObject deleteSuppliers(@PathVariable("id") Integer id) {
        return service.deleteSuppliers(id);
    }

    @GetMapping("/insert_suppliers")
    public JSONObject insertSuppliers(@RequestParam("suppliers_name") String suppliers_name, @RequestParam("suppliers_phone") String suppliers_phone, @RequestParam("suppliers_address") String suppliers_address, @RequestParam("suppliers_email") String suppliers_email, @RequestParam("suppliers_description") String suppliers_description, @RequestParam("suppliers_country") String suppliers_country) {
        return service.insertSuppliers(suppliers_name, suppliers_phone, suppliers_email, suppliers_address, suppliers_description, suppliers_country);
    }

    @GetMapping("/query_keywords")
    public JSONObject queryKeywords(@RequestParam("keywords") String keywords) {
        return service.queryKeywords(keywords);
    }
}
