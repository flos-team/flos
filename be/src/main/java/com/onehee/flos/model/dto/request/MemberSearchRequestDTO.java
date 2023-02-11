package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.dto.type.MemberRelation;
import lombok.Data;

@Data
public class MemberSearchRequestDTO {
    private String nickname;
    private MemberRelation memberRelation = MemberRelation.NONE;
}