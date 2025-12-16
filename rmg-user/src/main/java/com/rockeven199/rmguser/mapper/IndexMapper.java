package com.rockeven199.rmguser.mapper;

import com.rockeven199.rmguser.entity.report_item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface IndexMapper {
    @Update("update rmg_sys_report set #{report_item} = #{report_item}")
    public Boolean UpdateData(report_item report_entity);
}
