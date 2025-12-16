package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Purchase;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PurchaseMapper {
    public List<Purchase> selectPurchase(@Param("startIndex") Integer startIndex,@Param("endIndex") Integer endIndex);

    @Update("update rmg_purchase set ${field}=#{value} where purchase_id=#{id}")
    public boolean updatePurchase(@Param("id") Integer id, @Param("field") String field, @Param("value") String value);

    @Delete("delete from rmg_purchase where purchase_id=#{id}")
    boolean deleteResource(@Param("id") Integer id);

    @Insert("insert into rmg_purchase values(null,#{name},#{count},#{start},#{end},#{state})")
    public boolean insertResource(@Param("name") String name, @Param("count") String count, @Param("start") String start, @Param("end") String end, @Param("state") String state);

    public Integer getTotalPurchaseCount();

    public List<Purchase> queryKeywords(@Param("keywords") String keywords);
}
