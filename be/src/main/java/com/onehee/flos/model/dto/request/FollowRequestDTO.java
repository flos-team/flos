package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class FollowRequestDTO {
    private final Long id;
    private final Boolean orderByName;

    public FollowRequestDTO(Long id) {
        this.id = id;
        orderByName = false;
    }
}