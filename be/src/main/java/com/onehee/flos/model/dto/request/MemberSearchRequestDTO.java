package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.dto.type.MemberRelation;
import lombok.Data;

@Data
public class MemberSearchRequestDTO {

    private final String nickname;
    private final MemberRelation memberRelation;

    public MemberSearchRequestDTO(String nickname) {
        this.nickname = nickname;
        memberRelation = MemberRelation.NONE;
    }

}