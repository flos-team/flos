package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(access = AccessLevel.PRIVATE)
public class MemberSignUpRequestDTO {
    private final String email;
    private final String nickname;
    private final String password;
    private final String code;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .build();
    }
}
