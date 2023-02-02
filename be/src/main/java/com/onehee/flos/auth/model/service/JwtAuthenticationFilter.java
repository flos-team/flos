package com.onehee.flos.auth.model.service;

import com.onehee.flos.auth.model.dto.Subject;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.jar.JarException;

@RequiredArgsConstructor
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberDetailsService memberDetailsService;
    // 헤더에 오는 토큰의 형식은 "Bearer " + 토큰으로 날아온다.
    private final String TokenType = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null) {
            for (Cookie cookie: request.getCookies()) {
                log.info(cookie.getName());
                log.info(cookie.getValue());
            }
            authorization = request.getHeader("cookie");
        }
        if (authorization.startsWith(TokenType)) {
            log.info("{}", authorization);
            // 토큰앞부분에 있는 "Bearer "을 제거해서 토큰만 남긴다.
            String token = authorization.substring(TokenType.length());
            // 토큰 유효성 검사
            jwtTokenProvider.checkToken(token);
            try {
                Subject subject = jwtTokenProvider.getSubject(token);
                String requestURI = request.getRequestURI();
                if (subject.getType().equals("RTK")) {
                    if (!request.getRequestURI().equals("/member/reissue")) {
                        throw new JwtException("리프레시 토큰은 재발행만 수행 할 수 있습니다.");
                    }
                    if (!jwtTokenProvider.isValidatedRTK(token, subject)) {
                        log.info("{}", token);
                        throw new JarException("만료된 리프레시 토큰입니다. 재로그인이 필요합니다.");
                    }
                }
                if (subject.getType().equals("ATK")) {
                    if (request.getRequestURI().equals("/member/reissue")) {
                        throw new JwtException("엑세스 토큰은 재발행을 수행 할 권한이 없습니다.");
                    }
                    if (jwtTokenProvider.isBlackATK(token)) {
                        throw new JwtException("사용 할 수 없는 토큰입니다.");
                    }
                }
                UserDetails userDetails = memberDetailsService.loadUserByUsername(subject.getId().toString());
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (JwtException e) {
                request.setAttribute("exception", e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}
