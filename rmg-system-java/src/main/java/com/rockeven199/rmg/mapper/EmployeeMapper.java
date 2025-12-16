package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.Employee;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    public List<Employee> selectEmployee(@Param("startIndex") Integer startIndex, @Param("endIndex") Integer endIndex);

    @Update("update rmg_employee set ${yield}=#{value} where employee_id=${id}")
    public boolean updateEmployee(@Param("yield") String yield, @Param("value") String value, @Param("id") Integer id);

    @Delete("delete from rmg_employee where employee_id=#{id}")
    public boolean deleteEmployee(@Param("id") Integer id);

    @Insert("insert into rmg_employee values (null,#{name},#{age},#{sex},#{address},#{time},#{department},#{second_department},#{job},#{level},#{phone},#{card_id},#{email})")
    public boolean insertEmployee(@Param("name") String name, @Param("age") Integer age, @Param("sex") String sex, @Param("address") String address, @Param("time") String time, @Param("department") String department, @Param("second_department") String second_department, @Param("job") String job, @Param("level") String level, @Param("phone") String phone, @Param("card_id") String card_id, @Param("email") String email);

    public Integer getTotalEmployeeCount();

    public List<Employee> queryKeywords(@Param("keywords") String keywords);
}
