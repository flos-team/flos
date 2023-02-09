package com.onehee.flos.model.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberPasswordUpdateRequestDTO {
    private final String currentPassword;
    private final String newPassword;
}
