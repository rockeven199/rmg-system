package com.rockeven199.rmguser.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmguser.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/index")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping("/main")
    private String getAllReports(Model model) {
        model.addAttribute("msg", reportService.getAllReport());
        return "index";
    }

    @GetMapping("/chat")
    private String chat() {
        redisTemplate.opsForValue().set("a","This is Redis for Java");
        return "chat";
    }

    @ResponseBody
    @GetMapping("/updateReport")
    private Integer updateReport(@RequestParam("report_id") String report_id, @RequestParam("report_title") String report_title, @RequestParam("report_type") String report_type, @RequestParam("report_content") String report_content, @RequestParam("report_submit_time") String report_submit_time, @RequestParam("report_repair_time") String report_repair_time, @RequestParam("report_repair_state") String report_repair_state) {
        return reportService.updateReport(report_id, report_title, report_type, report_content, report_submit_time, report_repair_time, report_repair_state);
    }

//    @GetMapping("/{id}")
//    public String getAll(Model model, @PathVariable String id) {
//        model.addAttribute("msg", reportService.getWorkList(id));
//        return "index";
//    }
}
