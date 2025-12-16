package com.rockeven199.rmguser.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("rmg_sys_report")
public class report_item {
    @TableId(type = IdType.AUTO)
    private String report_id;
    private String report_title;
    private String report_type;
    private String report_content;
    private String report_submit_time;
    private String report_repair_time;
    private String report_repair_state;
}
