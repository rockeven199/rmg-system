package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Base;
import com.rockeven199.rmg.entity.News;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BaseMapper {

    @Select("select ${options_type} from rmg_sys_options")
    public List<Base> get_options(String options_type);

    @Select("select * from rmg_news where news_id=#{newsID}")
    public List<News> get_news(@Param("newsID") String newsID);

    @Select("select DISTINCT position_name from rmg_position")
    public List<Base> get_position_options();

    @Select("select count(news_id) from rmg_news")
    Integer get_total_news_count();

    @Select("select news_pub_datetime,news_id,news_title from rmg_news;")
    public List<Base> get_news_list();

    @Select("select count(${yield}) from ${data_table};")
    public Integer get_data_total_count(@Param("yield") String yield, @Param("data_table") String data_table);
}
