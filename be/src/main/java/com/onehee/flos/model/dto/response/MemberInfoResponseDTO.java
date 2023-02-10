package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.type.MemberRelation;
import com.onehee.flos.model.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
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
    private int postCount;
    private int blossomCount;
    private int totalWater;
    private int totalLight;
    @Setter
    private MemberRelation memberRelation;

    public static MemberInfoResponseDTO toDto(Member member) {
        return MemberInfoResponseDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileImage(getImage(member))
                .introduction(member.getIntroduction())
                .water(member.getWater())
                .light(member.getLight())
                .totalWater(member.getTotalWater())
                .totalLight(member.getTotalLight())
                .followerCount(member.getFollowerCount())
                .followingCount(member.getFollowingCount())
                .postCount(member.getPostCount())
                .blossomCount(member.getBlossomCount())
                .build();
    }

    private static FileResponseDTO getImage(Member member) {
        return FileResponseDTO.toDTO(member.getProfileImage());
    }

}
