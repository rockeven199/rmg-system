package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Suppliers;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SuppliersMapper {
    public List<Suppliers> selectSuppliers(@Param("startIndex") Integer startIndex,@Param("endIndex") Integer endIndex);

    @Update("update rmg_suppliers set ${field}=#{value} where suppliers_id=${id}")
    public boolean updateSuppliers(@Param("field") String field,@Param("value") String value,@Param("id") Integer id);

    @Delete("delete from rmg_suppliers where suppliers_id=#{id}")
    public boolean deleteSuppliers(@Param("id") Integer id);

    @Insert("INSERT INTO rmg_suppliers VALUES (null,#{name},#{phone},#{address},#{email},#{description},#{country})")
    public boolean insertSuppliers(@Param("name") String name,@Param("phone") String phone,@Param("address") String address,@Param("email") String email,@Param("description") String description,@Param("country") String country);

    public List<Suppliers> queryKeywords(@Param("keywords") String keywords);
}
