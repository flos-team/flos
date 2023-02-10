package com.onehee.flos.model.dto.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 비트구성 ABC
// A: 본인일때 1
// B: 나의 팔로워일때 1
// C: 내가 팔로워일때 1
@AllArgsConstructor
@Getter
public enum MemberRelation {
    ME(7),       // 111  7
    FOLLOWER(2),   // 010  2
    FOLLOWED(1),   // 001  1
    FRIEND(3),     // 011  3
    OTHER(4),      // 100  4
    NONE(0);       // 000  0

    private final int code;

}
