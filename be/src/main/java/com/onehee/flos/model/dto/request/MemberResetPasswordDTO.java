package com.onehee.flos.model.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberResetPasswordDTO {
    private final String email;
    private final String code;
    private final String password;
}
