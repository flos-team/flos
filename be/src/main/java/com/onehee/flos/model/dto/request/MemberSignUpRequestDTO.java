package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class MemberSignUpRequestDTO {
    private final String email;
    private final String nickname;
    private final String password;
    private final MultipartFile picture;
    private final String code;

    @Builder
    public MemberSignUpRequestDTO(String email, String nickname, String password, MultipartFile picture, String code) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.picture = picture;
        this.code = code;
    }

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
//                .picture(picture.getName())
                .build();
    }
}
