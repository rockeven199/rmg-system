package com.rockeven199.rmguser.service;

import com.rockeven199.rmguser.entity.report_item;
import com.rockeven199.rmguser.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    @Autowired
    public ReportMapper reportMapper;

    public report_item getWorkList(String id) {
        return reportMapper.selectById(id);
    }

    public List<report_item> getAllReport() {
        return reportMapper.getAllReport();
    }

    public Integer updateReport(String report_id, String report_title, String report_type, String report_content, String report_submit_time, String report_repair_time, String report_repair_state) {
        report_item reportitem = new report_item();
        reportitem.setReport_id(report_id);
        reportitem.setReport_title(report_title);
        reportitem.setReport_type(report_type);
        reportitem.setReport_content(report_content);
        reportitem.setReport_submit_time(report_submit_time);
        reportitem.setReport_repair_time(report_repair_time);
        reportitem.setReport_repair_state(report_repair_state);
        return reportMapper.updateById(reportitem);
    }
}
