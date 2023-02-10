package com.onehee.flos.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UnfollowRequestDTO {
    private Long id;
    private Boolean orderByName;

    public UnfollowRequestDTO() {
        orderByName = false;
    }
}
