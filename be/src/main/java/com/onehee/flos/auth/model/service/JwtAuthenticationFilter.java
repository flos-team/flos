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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;
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
        // 엑세스 토큰
        String authorization = request.getHeader("Authorization");
        // 리프레시 토큰
        String refresh = request.getHeader("Refresh");
        // 리프레시 토큰이 헤더에 올시 검증하는 토큰을 리프레시 토큰으로 교체
        // 토큰 재발급 요청시엔 두개의 토큰 모두 있어야 한다.
        // 기존 엑세스 토큰을 블랙리스트에 등록시키기 위함(엑세스 토큰이 만료되지않았는데 재발급 요청시 고려)
        authorization = refresh == null ? authorization : refresh;
        if (!Objects.isNull(authorization) && authorization.startsWith(TokenType)) {
            log.info("{}", authorization);
            // 토큰앞부분에 있는 "Bearer "을 제거해서 토큰만 남긴다.
            String token = authorization.substring(TokenType.length());
            // 토큰 유효성 검사
            jwtTokenProvider.validateToken(token);
            try {
                Subject subject = jwtTokenProvider.getSubject(token);
                String requestURI = request.getRequestURI();
                // 리프레시 토큰일 경우
                if (subject.getType().equals("RTK")) {
                    if (!requestURI.equals("/member/reissue") || !jwtTokenProvider.isValidatedRTK(token, subject)) {
                        throw new JwtException("토큰이 유효하지 않습니다.");
                    }
                }
                // 엑세스 토큰일 경우
                if (subject.getType().equals("ATK")) {
                    if (requestURI.equals("/member/reissue")) {
                        throw new JwtException("토큰 재발급은 엑세스 토큰으로 할 수 없습니다.");
                    }
                    if (jwtTokenProvider.isBlackATK(token)) {
                        throw new JarException("사용 할 수 없는 토큰입니다.");
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
