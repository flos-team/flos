package com.onehee.flos.util;

import io.jsonwebtoken.JwtException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookieUtil {
    public static String getRtk(HttpServletRequest request) {
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("rtk")) {
                return cookie.getValue().substring(7);
            }
        }
        throw new JwtException("리프레시 토큰이 없습니다.");
    }
}
