package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class FollowRequestDTO {
    private Long id;
    private Boolean orderByName = false;
}