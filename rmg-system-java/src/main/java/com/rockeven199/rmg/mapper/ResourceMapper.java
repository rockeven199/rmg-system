package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Resource;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ResourceMapper {

    public boolean updateResource(@Param("field_name") String field_name, @Param("field_value") String field_value, @Param("id") Integer id);

    public boolean insertResource(@Param("name") String name, @Param("count") String count, @Param("position") String position, @Param("state") String state);

    public boolean deleteResource(@Param("id") Integer id);

    public List<Resource> selectResource(@Param("startIndex") Integer startIndex, @Param("endIndex") Integer endIndex);

    public List<Resource> queryKeywords(@Param("keywords") String keywords);
}
