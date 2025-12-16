package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.entity.User;
import com.rockeven199.rmg.mapper.UserMapper;
import com.rockeven199.rmg.service.PersonalService;
import com.rockeven199.rmg.utils.JWTUtils;
import com.rockeven199.rmg.utils.SetReturnMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController extends SetReturnMessage {
    @Autowired
    private PersonalService personalService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private TemplateEngine templateEngine;

    // 上传头像
    @PostMapping("/upload_header_image")
    public JSONObject uploaderHeader(@RequestParam("file") MultipartFile userUploadFile,
                                     @RequestParam("username") String username, @RequestParam("userID") Integer userID) {
        return personalService.uploadHeaderImage(userUploadFile, username, userID);
    }

    // 获取头像
    @PostMapping("/get_preview_image")
    public JSONObject getPreviewImage(@RequestParam("userId") Integer user_id) {
        return personalService.getHeaderImage(user_id);
    }

    // 更新头像
    @PutMapping("/update_header_image")
    public JSONObject updateHeaderImage(@RequestParam("header_image") String header_image,
                                        @RequestParam("user_id") Integer user_id) {
        return personalService.updateHeaderImage(header_image, user_id);
    }

    // 删除头像
    @DeleteMapping("/delete_header_image")
    public JSONObject deleteHeaderImage(@RequestParam("header_image") String header_image,
                                        @RequestParam("user_id") Integer user_id, @RequestParam("username") String username) {
        return personalService.deleteHeaderImage(header_image, user_id, username);
    }

    // 获取用户个人信息
    @PostMapping("/init_user_data")
    public JSONObject initCenterUser(HttpServletRequest request) {
        try {
        String token = request.getHeader("Authorization");
        String username = JWTUtils.verify(token).getClaim("Username").asString();
        String password = JWTUtils.verify(token).getClaim("Password").asString();
        List<User> result = userMapper.getUserProfile(username, password);
        return result != null ? resultSuccessMessage("查询", result) : resultErrorMessage("查询66");
    } catch(
    Exception e)

    {
        System.out.println(e);
        return resultErrorMessage("验证登录1111", "", "403");
    }

    }

    // 修改个人资料
    @PutMapping("/set_user_profile")
    public JSONObject setUserProfile(@RequestParam("phone_number") String phone_number,
                                     @RequestParam("email") String email, @RequestParam("user_id") Integer user_id,
                                     @RequestParam("username") String username) {
        boolean result = userMapper.setUserProfile(phone_number, email, user_id, username);
        if (result) {
            return resultSuccessMessage("保存", true);
        } else {
            return resultErrorMessage("保存");
        }
    }

    @GetMapping("/contact")
    public JSONObject contact(@RequestParam("content") String content) {
        return resultSuccessMessage("发送");
    }
}