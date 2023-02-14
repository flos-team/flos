package com.onehee.flos.auth.model.dto;

import com.onehee.flos.model.entity.type.ProviderType;
import lombok.*;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

@Getter
@NoArgsConstructor
public class OAuth2UserDTO {

    private String email;

    private String profileImage;

    private ProviderType providerType;

    @Builder
    public OAuth2UserDTO(String email, String nickname, String profileImage, ProviderType providerType) {
        this.email = email;
        this.profileImage = profileImage;
        this.providerType = providerType;
    }

    public static OAuth2UserDTO toDto(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        return OAuth2UserDTO.builder()
                .email((String) attributes.get("email"))
                .profileImage((String) attributes.get("picture"))
                .providerType((ProviderType) attributes.get("providerType"))
                .build();
    }

}
