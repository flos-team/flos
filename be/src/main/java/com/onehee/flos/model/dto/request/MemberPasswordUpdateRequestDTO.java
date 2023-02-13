package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class MemberPasswordUpdateRequestDTO {
    private String currentPassword;
    private String newPassword;
}
