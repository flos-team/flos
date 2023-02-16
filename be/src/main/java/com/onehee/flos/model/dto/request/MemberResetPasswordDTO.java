package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class MemberResetPasswordDTO {
    private String email;
    private String code;
    private String password;
}
