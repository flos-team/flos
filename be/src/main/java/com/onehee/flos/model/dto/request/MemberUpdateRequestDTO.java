package com.onehee.flos.model.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@RequiredArgsConstructor
public class MemberUpdateRequestDTO {
    private final String nickname;
    private final String introduction;
    private final MultipartFile profileImage;
}
