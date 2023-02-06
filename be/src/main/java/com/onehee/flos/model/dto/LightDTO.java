package com.onehee.flos.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LightDTO {
    private Long ownerId;
    private Long contributorId;
}
