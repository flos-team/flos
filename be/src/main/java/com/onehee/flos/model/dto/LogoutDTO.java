package com.onehee.flos.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LogoutDTO {
    private final String atk;
    private final String email;
}
