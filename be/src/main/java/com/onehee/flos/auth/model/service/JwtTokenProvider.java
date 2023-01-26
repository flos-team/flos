package com.onehee.flos.auth.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.auth.model.dto.Subject;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.model.dto.request.ReissueRequestDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
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
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenResponse generateTokenByMember(Member member) throws JsonProcessingException {
        Subject atkSubject = Subject.atk(member);
        Subject rtkSubject = Subject.rtk(member);
        String atk = generateToken(atkSubject, atkExpire);
        String rtk = generateToken(rtkSubject, rtkExpire);
        redisRepository.deleteValue("rtk:" + member.getId());
        redisRepository.setValue("rtk:" + member.getId(), rtk, Duration.ofMillis(rtkExpire));
        return new TokenResponse(atk, rtk);
    }

    public TokenResponse reissueToken(ReissueRequestDTO reissueRequestDTO) throws JsonProcessingException {
        String oldAtk = reissueRequestDTO.getAtk();
        redisRepository.setValue("black:" + getSubject(oldAtk).getId(), oldAtk, Duration.ofMillis(atkExpire));
        Member member = memberRepository.findById(getSubject(oldAtk).getId())
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        return generateTokenByMember(member);
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

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            log.info("유효하지 않은 JWT 토큰입니다.", e);
        } catch (ExpiredJwtException e) {
            log.info("유효기간이 만료된 JWT 토큰입니다.", e);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 JWT 토큰입니다.", e);
        } catch (MissingClaimException e) {
            log.info("클레임이 비어있습니다.", e);
        }
        return false;
    }

    public Subject getSubject(String token) throws JsonProcessingException {
        String subjectStr = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }

    public boolean isValidatedRTK(String rtk, Subject subject) throws JsonProcessingException {
        String rtkInRedis = redisRepository.getValue("rtk:" + subject.getId());
        return rtk.equals(rtkInRedis);
    }

    public String getId(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
}
