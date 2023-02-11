package com.onehee.flos.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LogoutDTO {
    private String atk;
    private String email;
}
