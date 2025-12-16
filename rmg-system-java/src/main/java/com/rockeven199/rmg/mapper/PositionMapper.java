package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Position;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PositionMapper {
    @Insert("INSERT INTO rmg_position VALUES (null,#{name},#{state},#{desc},#{state_code})")
    public boolean insertPosition(@Param("name") String name, @Param("state") String state, @Param("desc") String desc, @Param("state_code") Integer state_code);

    @Delete("DELETE from rmg_position WHERE rmg_position.position_name=#{name} and rmg_position.position_name not in (SELECT rmg_resource.resource_position from rmg_resource WHERE rmg_resource.resource_position=#{name})")
    public boolean deletePosition(@Param("name") String name);

    public List<Position> selectPosition(@Param("startIndex") Integer startIndex, @Param("endIndex") Integer endIndex);

    @Update("update rmg_position set ${field}=#{value} where position_id=${id}")
    public boolean updatePosition(@Param("field") String field, @Param("value") String value, @Param("id") Integer id);

    public List<Position> queryKeywords(@Param("keywords") String keywords);
}
