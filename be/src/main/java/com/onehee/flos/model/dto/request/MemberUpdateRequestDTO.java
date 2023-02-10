package com.onehee.flos.model.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberUpdateRequestDTO {
    private final String nickname;
    private final String introduction;
    private final MultipartFile profileImage;
}
