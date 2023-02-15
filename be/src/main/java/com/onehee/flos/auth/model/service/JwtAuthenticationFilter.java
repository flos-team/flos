package com.onehee.flos.auth.model.service;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.auth.model.dto.Subject;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.util.CookieUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberDetailsService memberDetailsService;
    // 헤더에 오는 토큰의 형식은 "Bearer " + 토큰으로 날아온다.
    private final String TokenType = "Bearer ";
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        String token;
        try {
            if (authorization.startsWith(TokenType)) {
                // 토큰앞부분에 있는 "Bearer "을 제거해서 토큰만 남긴다.
                token = authorization.substring(TokenType.length());
                Subject subject = jwtTokenProvider.getSubject(token);
                if (jwtTokenProvider.isBlackATK(token)) {
                    throw new JwtException("사용 할 수 없는 토큰입니다.");
                }
                UserDetails userDetails = memberDetailsService.loadUserByUsername(subject.getId().toString());
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                response.setHeader("Authorization", "Bearer " + token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (NullPointerException | JwtException e) {
            // 재발행
            try {
                token = CookieUtil.getRtk(request);
                Subject subject = jwtTokenProvider.getSubject(token);
                UserDetails userDetails = memberDetailsService.loadUserByUsername(subject.getId().toString());
                Member member = ((MemberDetails) userDetails).getMember();
                TokenDTO tokenDTO = jwtTokenProvider.generateTokenByMember(member);
                ResponseCookie cookie = jwtTokenProvider.getRtkCookie(tokenDTO.getRtk());
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                response.setHeader("Authorization", "Bearer " + tokenDTO.getAtk());
                response.setHeader("Set-Cookie", cookie.toString());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (JwtException ee) {
                request.setAttribute("exception", ee.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return Stream.of("/member/sign-up", "/member/login", "/member/check/*", "/email/*", "/file/**", "/member/reset-password", "/v3/api-docs/**",
                "/swagger-ui/**", "/swagger-resources/**").anyMatch(exclude -> antPathMatcher.match(exclude, request.getServletPath()));
    }

}
