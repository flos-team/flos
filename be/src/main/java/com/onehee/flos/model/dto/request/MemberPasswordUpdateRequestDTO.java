package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class MemberPasswordUpdateRequestDTO {
    private final String currentPassword;
    private final String newPassword;
}
