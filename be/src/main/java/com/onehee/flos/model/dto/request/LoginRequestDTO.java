package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Pattern;

@Schema(description = "로그인 요청 DTO")
@Getter
@RequiredArgsConstructor
public class LoginRequestDTO {
    @Pattern(regexp = "^\\w+@\\w+\\.\\w+$")
    private final String email;
    private final String password;
}
