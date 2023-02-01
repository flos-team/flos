package com.onehee.flos.model.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@RequiredArgsConstructor
public class MemberUpdateRequestDTO {
    private String nickname;
    private MultipartFile profileImage;
}
