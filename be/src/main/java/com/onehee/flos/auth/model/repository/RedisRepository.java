package com.onehee.flos.auth.model.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
@Log4j2
public class RedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    // 리프레시 토큰 등록(만료 기간 미포함)
    public void setValue(String key, String data) {
        ValueOperations<String, String> value = redisTemplate.opsForValue();
        value.set(key, data);
        log.debug("save in redis -> {}: {}",key, data);
    }

    // 리프레시 토큰 등록(만료 기간 포함)
    public void setValue(String key, String data, Duration duration) {
        ValueOperations<String, String> value = redisTemplate.opsForValue();
        value.set(key, data, duration);
        log.debug("save in redis -> {}: {} during {}",key, data, duration);
    }

    // 리프레시 토큰 조회
    public String getValue(String key) {
        ValueOperations<String, String> value = redisTemplate.opsForValue();
        String data = value.get(key);
        log.debug("select data in redis -> {}: {}", key, data);
        return data;
    }

    // 리프레시 토큰 삭제
    public void deleteValue(String key) {
        redisTemplate.delete(key);
        log.debug("delete {}'s refresh token", key);
    }
}
