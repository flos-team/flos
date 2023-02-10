package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class EmailVerificationRequestDTO {
    private final String email;
    private final String code;
}
