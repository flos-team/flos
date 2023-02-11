package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Pattern;

@Schema(description = "로그인 요청 DTO")
@Data
public class LoginRequestDTO {
    @Pattern(regexp = "^\\w+@\\w+\\.\\w+$")
    private String email;
    private String password;
}
