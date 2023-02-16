package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.type.MemberRelation;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.RoleType;
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
    private RoleType roleType;
    @Setter
    private MemberRelation memberRelation;

    public static MemberInfoResponseDTO toDto(Member member) {
        if (member.getStatus().equals(MemberStatus.INACTIVE)) {
            return getInactiveMember(member);
        }
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
                .roleType(member.getRoleType())
                .build();
    }

    private static FileResponseDTO getImage(Member member) {
        return FileResponseDTO.toDTO(member.getProfileImage());
    }

    private static MemberInfoResponseDTO getInactiveMember(Member member) {
        return MemberInfoResponseDTO.builder()
                .id(member.getId())
                .email("탈퇴한 회원입니다.")
                .nickname("탈퇴한 회원")
                .profileImage(FileResponseDTO.toDTO(null))
                .introduction("탈퇴한 회원입니다.")
                .water(0)
                .light(0)
                .totalWater(0)
                .totalLight(0)
                .followerCount(0)
                .followingCount(0)
                .postCount(0)
                .blossomCount(0)
                .roleType(RoleType.USER)
                .build();
    }

}
