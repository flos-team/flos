package com.onehee.flos.model.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
public class FollowDTO {
    private final Long id;
    private final boolean orderByName;
}
