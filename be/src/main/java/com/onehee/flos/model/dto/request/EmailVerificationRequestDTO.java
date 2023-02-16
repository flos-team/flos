package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class EmailVerificationRequestDTO {
    private String email;
    private String code;
}
