package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class MemberResetPasswordDTO {
    private final String email;
    private final String code;
    private final String password;
}
