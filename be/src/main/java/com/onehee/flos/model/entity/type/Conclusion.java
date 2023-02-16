package com.onehee.flos.model.entity.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public enum Conclusion {
    BAN_1DAY(1),
    BAN_7DAY(7),
    BAN_30DAY(30),
    BAN_FOREVER(36500),
    REJECT(0);

    private final Integer day;
}
