package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.type.MemberRelation;
import com.onehee.flos.model.entity.Member;
import lombok.*;

@Getter
@Setter
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
    private int followerCount;
    private int followingCount;
    private MemberRelation memberRelation;

    public static MemberInfoResponseDTO toDto(Member member) {
        return MemberInfoResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileImage(FileResponseDTO.toDTO(member.getProfileImage()))
                .introduction(member.getIntroduction())
                .water(member.getWater())
                .light(member.getLight())
                .followerCount(member.getFollowerCount())
                .followingCount(member.getFollowingCount())
                .build();
    }

}
