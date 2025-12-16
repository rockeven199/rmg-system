package com.rockeven199.rmg.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.extra.qrcode.QrCodeUtil;
import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.entity.User;
import com.rockeven199.rmg.mapper.LoginMapper;
import com.rockeven199.rmg.utils.JWTUtils;
import com.rockeven199.rmg.utils.SetReturnMessage;
import com.rockeven199.rmg.websocket.LoginSocket;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login")
public class LoginController extends SetReturnMessage {

    @Autowired
    private LoginMapper loginMapper;

    HttpSession codeSession;

    @Autowired
    private LoginSocket loginSocket;

    //    登录
    @PostMapping("/login")
    public JSONObject Login(@RequestParam("Username") String username, @RequestParam("Password") String password, @RequestParam("Captcha") String CaptchaCode, HttpSession session) {
        List<User> UserData = loginMapper.Login(username, password);
        try {
            if (codeSession.getAttribute("captchaCode").equals(CaptchaCode)) {
                Map<String, String> payload = new HashMap<>();
                payload.put("Username", UserData.get(0).getUsername());
                payload.put("Password", UserData.get(0).getPassword());
                String token = JWTUtils.getToken(payload);
                return resultSuccessMessage("登录", token);
            } else {
                return JSONObject.parseObject("{'msg':'验证码错误！','code':403,'state':false}");
            }
        } catch (NullPointerException e) {
            return JSONObject.parseObject("{'msg':'请先获取验证码！','code':403,'state':false}");
        } catch (IndexOutOfBoundsException e) {
            return JSONObject.parseObject("{'msg':'请检查用户名或密码！','code':403,'state':false}");
        }
    }

    //   获取验证码
    @GetMapping("/captcha")
    public void LoginGetCode(HttpServletResponse response, HttpSession session) throws IOException {
        LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(200, 100);
        lineCaptcha.write(response.getOutputStream());
        session.setAttribute("captchaCode", lineCaptcha.getCode());
        session.setMaxInactiveInterval(36000);
        codeSession = session;
        response.getOutputStream().close();
    }

    //    获取登录二维码
    @GetMapping("/get_QR_code")
    public void GetQRCode(HttpServletResponse response) throws IOException {
        String id = loginSocket.getRunningSession().getId();
        BufferedImage bufferedImage = QrCodeUtil.generate(id, 300, 300);
        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(bufferedImage, "png", out);
        out.flush();
        out.close();
    }

    //    验证登录二维码
    @GetMapping("/check_QR_code")
    public String CheckQRCode(@RequestParam String token, @RequestParam String QRSessionID) throws Exception {
        System.out.println(token + QRSessionID);
//        登录信息验证
        List<User> userdata = loginMapper.Login(JWTUtils.verify(token).getClaim("Username").asString(), JWTUtils.verify(token).getClaim("Password").asString());
//        查询用户信息
        if (!userdata.isEmpty()) {
            loginSocket.sendMessage(userdata.get(0).getUsername() + "," + token, QRSessionID);
            return "true";
        } else {
            loginSocket.sendMessage("false", QRSessionID);
            return "false！";
        }
    }
}
