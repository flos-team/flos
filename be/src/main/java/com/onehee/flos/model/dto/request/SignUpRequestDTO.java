package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class SignUpRequestDTO {
    private final String email;
    private final String nickname;
    private final String password;
    private final MultipartFile picture;

    @Builder
    public SignUpRequestDTO(String email, String nickname, String password, MultipartFile picture) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.picture = picture;
    }

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
//                .picture(picture.getName())
                .build();
    }
}
