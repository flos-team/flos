package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(access = AccessLevel.PRIVATE)
public class MemberSignUpRequestDTO {
    private String email;
    private String nickname;
    private String password;
    private String code;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .build();
    }
}
