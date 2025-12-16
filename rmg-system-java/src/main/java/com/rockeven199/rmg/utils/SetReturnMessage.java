package com.rockeven199.rmg.utils;

import com.alibaba.fastjson2.JSONObject;

import java.util.List;

/**
 * @author rockeven199
 * @apiNote resultSuccessMessage, resultErrorMessage
 */
public class SetReturnMessage {
    public JSONObject resultSuccessMessage(String successMessage) {
        return JSONObject.parseObject("{'code':200,'msg':'" + successMessage + "成功！','state':true}");
    }

    public JSONObject resultSuccessMessage(String successMessage, List<?>... data) {
        String splitData = JSONObject.toJSONString(data).substring(1, JSONObject.toJSONString(data).length() - 1);
        String str = data == null ? "{'code':200,'msg':'" + successMessage + "成功！','state':true}" : "{'code':200,'msg':'" + successMessage + "成功！','state':true,'data':" + splitData + "}";
        return JSONObject.parseObject(str);
    }

    public JSONObject resultSuccessMessage(String successMessage, boolean... data) {
        String splitData = JSONObject.toJSONString(data).substring(1, JSONObject.toJSONString(data).length() - 1);
        String str = data == null ? "{'code':200,'msg':'" + successMessage + "成功！','state':true}" : "{'code':200,'msg':'" + successMessage + "成功！','state':true,'data':" + splitData + "}";
        return JSONObject.parseObject(str);
    }

    public JSONObject resultSuccessMessage(String successMessage, String... data) {
        String splitData = JSONObject.toJSONString(data).substring(1, JSONObject.toJSONString(data).length() - 1);
        String str = data == null ? "{'code':200,'msg':'" + successMessage + "成功！','state':true}" : "{'code':200,'msg':'" + successMessage + "成功！','state':true,'data':" + splitData + "}";
        return JSONObject.parseObject(str);
    }


    /**
     * @name 失败返回消息
     */
    public JSONObject resultErrorMessage(String errorMessage) {
        String str = "{'code':500,'msg':'" + errorMessage + "失败！','state':false}";
        return JSONObject.parseObject(str);
    }

    public JSONObject resultErrorMessage(String errorMessage, String moreMessage) {
        String str = "{'code':500,'msg':'" + errorMessage + "失败！" + moreMessage + "','state':false}";
        return JSONObject.parseObject(str);
    }

    public JSONObject resultErrorMessage(String errorMessage, String moreMessage,String errorCode) {
        String str = "{'code':"+errorCode+",'msg':'" + errorMessage + "失败！" + moreMessage + "','state':false}";
        return JSONObject.parseObject(str);
    }
}

