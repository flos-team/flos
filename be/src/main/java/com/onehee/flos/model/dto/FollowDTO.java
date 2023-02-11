package com.onehee.flos.model.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@Data
@AllArgsConstructor
@Setter(AccessLevel.NONE)
public class FollowDTO {
    private Long id;
    private boolean orderByName;
}
