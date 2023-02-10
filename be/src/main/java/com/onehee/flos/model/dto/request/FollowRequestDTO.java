package com.onehee.flos.model.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class FollowRequestDTO {
    private Long id;
    private Boolean orderByName;

    public FollowRequestDTO() {
        orderByName = false;
    }

}