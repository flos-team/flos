package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoResponseDTO {
    private Long id;
    private String email;
    private String nickname;
    private FileResponseDTO profileImage;
    private String introduction;
    private int water;
    private int light;

    public static MemberInfoResponseDTO toDto(Member member) {
        return MemberInfoResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileImage(FileResponseDTO.toDTO(member.getProfileImage()))
                .introduction(member.getIntroduction())
                .build();
    }

}
