package com.rockeven199.rmguser.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rockeven199.rmguser.entity.report_item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReportMapper extends BaseMapper<report_item> {
    @Select("select * from rmg_sys_report")
    List<report_item> getAllReport();
}
