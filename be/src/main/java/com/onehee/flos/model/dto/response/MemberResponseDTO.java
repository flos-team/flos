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
public class MemberResponseDTO {
    private Long id;
    private String email;
    private String nickname;
    private FileResponseDTO picture;
    private int water;
    private int light;

    public static MemberResponseDTO toDto(Member member) {
        return MemberResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .picture(FileResponseDTO.toDTO(member.getProfileImage()))
                .build();
    }

}
