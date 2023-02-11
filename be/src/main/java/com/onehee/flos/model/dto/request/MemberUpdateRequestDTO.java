package com.onehee.flos.model.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberUpdateRequestDTO {
    private String nickname;
    private String introduction;
    private MultipartFile profileImage;
}
