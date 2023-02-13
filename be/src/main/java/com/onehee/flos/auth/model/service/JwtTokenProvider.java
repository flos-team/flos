package com.onehee.flos.auth.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.auth.model.dto.Subject;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtTokenProvider {

    @Value("${spring.jwt.key}")
    private String secretKey;

    @Value("${spring.jwt.expire.atk}")
    private Long atkExpire;

    @Value("${spring.jwt.expire.rtk}")
    private Long rtkExpire;

    private final RedisRepository redisRepository;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenDTO generateTokenByMember(Member member) throws JsonProcessingException {
        Subject atkSubject = Subject.atk(member);
        Subject rtkSubject = Subject.rtk(member);
        String atk = generateToken(atkSubject, atkExpire);
        String rtk = generateToken(rtkSubject, rtkExpire);
        redisRepository.deleteValue("rtk:" + member.getId());
        redisRepository.setValue("rtk:" + member.getId(), rtk, Duration.ofMillis(rtkExpire));

        member.setLastLoginAt(LocalDateTime.now());
        memberRepository.save(member);

        return new TokenDTO(atk, rtk);
    }

    public String generateToken(Subject subject, Long expire) throws JsonProcessingException {
        String subjectStr = objectMapper.writeValueAsString(subject);
        Claims claims = Jwts.claims().setSubject(subjectStr);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expire))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public void checkToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        } catch (MalformedJwtException e) {
            log.info("유효하지 않은 JWT 토큰입니다.");
        } catch (ExpiredJwtException e) {
            log.info("유효기간이 만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT 토큰입니다.");
        } catch (MissingClaimException e) {
            log.info("클레임이 비어있습니다.");
        }
    }

    public Subject getSubject(String token) throws JsonProcessingException {
        String subjectStr = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }

    public boolean isValidatedRTK(String rtk, Subject subject) {
        String rtkInRedis = redisRepository.getValue("rtk:" + subject.getId());
        return rtk.equals(rtkInRedis);
    }
    public boolean isBlackATK(String atk) {
        return redisRepository.getValue("black:" + atk) != null;
    }

    public void abandonTokens(LogoutDTO logoutDTO) {
        redisRepository.setValue("black:" + logoutDTO.getAtk(), "true", Duration.ofMillis(atkExpire));
        redisRepository.deleteValue("rtk:" + logoutDTO.getEmail());
    }

    public ResponseCookie getRtkCookie(String rtk) {
        return ResponseCookie.from("rtk", "Bearer+" + rtk)
                .maxAge(rtkExpire)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
    }

    public ResponseCookie getRtkCookie(String rtk, long time) {
        return ResponseCookie.from("rtk", "Bearer+" + rtk)
                .maxAge(time)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
    }

}
