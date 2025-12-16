package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LoginMapper {
    @Select("select * from rmg_sys_admin where username=#{username} and password=#{password}")
    public List<User> Login(@Param("username") String username, @Param("password") String password);
}