package com.rockeven199.rmg.mapper;

import com.rockeven199.rmg.entity.HeaderImage;
import com.rockeven199.rmg.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from rmg_user_header_image where user_id=#{UserID};")
    public List<HeaderImage> selectHeader(@Param("UserID") Integer UserID);

    @Insert("insert into rmg_user_header_image values(#{UserID},#{header_url},#{header_image_name});")
    public boolean insertHeader(@Param("UserID") Integer UserID, @Param("header_url") String header_url, @Param("header_image_name") String header_image_name);

    @Update("update rmg_sys_admin set header_img=#{header_image} where id=${user_id}")
    public boolean updateHeader(@Param("header_image") String header_image, @Param("user_id") Integer user_id);

    @Delete("DELETE from rmg_user_header_image WHERE header_image_url=#{header_image_url} and user_id=#{user_id}")
    public boolean deleteHeader(@Param("header_image_url") String header_image_url, @Param("user_id") Integer user_id);

    @Select("select level,username,header_img,phone_number,email,department,job,second_department,id,sex from rmg_sys_admin where username=#{username} and password=#{password}")
    public List<User> getUserProfile(@Param("username") String username, @Param("password") String password);

    @Update("update rmg_sys_admin set phone_number=#{phone_number},email=#{email} where id=#{user_id} and username=#{username}")
    public boolean setUserProfile(@Param("phone_number") String phone_number, @Param("String") String email, @Param("user_id") Integer user_id, @Param("username") String username);
}
