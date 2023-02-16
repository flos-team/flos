package com.onehee.flos.auth.model.dto;

import com.onehee.flos.exception.OAuthProviderMissMatchException;
import com.onehee.flos.model.entity.type.ProviderType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
@Builder(access = AccessLevel.PRIVATE)
@Log4j2
public class OAuth2Attribute {

    private Map<String, Object> attributes;

    private String attributeKey;

    private String email;

    private String profileImage;

    private ProviderType providerType;

    public static OAuth2Attribute of(ProviderType providerType, String attributeKey, Map<String, Object> attributes) {
        return switch (providerType) {
            case KAKAO -> ofKakao("email", attributes);
            case NAVER -> ofNaver("id", attributes);
            default -> throw new OAuthProviderMissMatchException("올바른 소셜 로그인 플랫폼이 아닙니다.");
        };
    }

    private static OAuth2Attribute ofKakao(String attributeKey, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        log.info("account: {}", kakaoAccount);
        log.info("profile: {}", kakaoProfile);

        return OAuth2Attribute.builder()
                .email((String) kakaoAccount.get("email"))
                .profileImage((String) kakaoProfile.get("profile_image_url"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .providerType(ProviderType.KAKAO)
                .build();
    }

    private static OAuth2Attribute ofNaver(String attributeKey, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuth2Attribute.builder()
                .email((String) response.get("email"))
                .profileImage((String) response.get("profile_image"))
                .attributes(response)
                .attributeKey(attributeKey)
                .providerType(ProviderType.NAVER)
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("email", email);
        map.put("picture", profileImage);
        map.put("providerType", providerType);

        return map;
    }
}
