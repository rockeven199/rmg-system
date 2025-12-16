package com.rockeven199.rmg.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

public class JWTUtils {
    private static final String SIGN = "rockeven199";

    public static String getToken(Map<String, String> map) {
        try {
            Calendar instance = Calendar.getInstance();
            instance.add(Calendar.YEAR, 168);
            JWTCreator.Builder builder = JWT.create();
            map.forEach(builder::withClaim);
            return builder.withExpiresAt(instance.getTime()).sign(Algorithm.HMAC256(SIGN));
        } catch (NullPointerException e) {
            return "";
        }
    }

    //    校验合法性
    public static DecodedJWT verify(String token) {
        return JWT.require(Algorithm.HMAC256(SIGN)).build().verify(token);
    }
}
