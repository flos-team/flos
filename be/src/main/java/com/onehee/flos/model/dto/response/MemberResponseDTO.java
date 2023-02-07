package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
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
        if (member.getProfileImage() != null) {
            return FileResponseDTO.toDTO(member.getProfileImage());
        }
        return FileResponseDTO.builder()
                .originalName("profile_image.jpg")
                .saveName("default/profile_image.jpg")
                .build();
    }
}
