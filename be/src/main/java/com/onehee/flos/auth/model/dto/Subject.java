package com.onehee.flos.auth.model.dto;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Subject {

    private final Long id;

    private final RoleType roleType;

    private final String type;

    @Builder
    private Subject(Long id, RoleType roleType, String type) {
        this.id = id;
        this.roleType = roleType;
        this.type = type;
    }

    public static Subject atk(Member member) {
        return Subject.builder()
                .id(member.getId())
                .roleType(member.getRoleType())
                .type("ATK")
                .build();
    }

    public static Subject rtk(Member member) {
        return Subject.builder()
                .id(member.getId())
                .roleType(member.getRoleType())
                .type("RTK")
                .build();
    }
}
