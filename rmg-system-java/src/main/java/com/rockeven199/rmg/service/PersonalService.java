package com.rockeven199.rmg.service;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.UserMapper;
import com.rockeven199.rmg.utils.SetReturnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class PersonalService extends SetReturnMessage {
    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private UserMapper mapper;

    //    查询头像
    public JSONObject getHeaderImage(Integer user_id) {
        return resultSuccessMessage("查询", mapper.selectHeader(user_id));
    }

    //    上传头像
    public JSONObject uploadHeaderImage(MultipartFile userUploadFile, String username, Integer UserID) {
        String filePath = uploadPath + username + UserID + "/header/";
        String fileName = userUploadFile.getOriginalFilename();
        JSONObject responseResult = null;
        File createFile = new File(filePath + fileName);

        mapper.insertHeader(UserID, username + UserID + "/header/" + fileName, fileName);

        if (createFile.exists()) {
            try {
                userUploadFile.transferTo(createFile);

                responseResult = resultSuccessMessage("上传", true);
            } catch (Exception e) {
                e.printStackTrace();
                responseResult = resultErrorMessage("上传");
            }
        } else {
            try {
                createFile.getParentFile().mkdirs();
                userUploadFile.transferTo(createFile);
                responseResult = resultSuccessMessage("上传", true);
            } catch (Exception e) {
                e.printStackTrace();
                responseResult = resultErrorMessage("上传");
            }
        }

        return responseResult;
    }

    //    更新头像
    public JSONObject updateHeaderImage(String header_image, Integer user_id) {
        if (mapper.updateHeader(header_image, user_id)) {
            return resultSuccessMessage("修改");
        } else {
            return resultErrorMessage("修改");
        }
    }

    //    删除头像
    public JSONObject deleteHeaderImage(String header_image_url, Integer user_id, String username) {
        File deleteFile = new File(uploadPath + header_image_url);
        boolean delFile = deleteFile.delete();
        boolean delSQL = mapper.deleteHeader(header_image_url, user_id);
        if (delFile && delSQL) {
            return resultSuccessMessage("删除", true);
        } else {
            return resultErrorMessage("删除");
        }
    }
}
