package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
@Builder
public class MemberResponseDTO {
    private Long id;
    private String email;
    private String nickname;
    private FileResponseDTO profileImage;
    private String introduction;

    public static MemberResponseDTO toDto(Member member) {
        return MemberResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileImage(getImage(member))
                .introduction(member.getIntroduction())
                .build();
    }

    private static FileResponseDTO getImage(Member member) {
        return FileResponseDTO.toDTO(member.getProfileImage());
    }
}
