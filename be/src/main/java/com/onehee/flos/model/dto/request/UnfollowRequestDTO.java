package com.onehee.flos.model.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
public class UnfollowRequestDTO {
    private Long id;
    private boolean orderByName;
}
