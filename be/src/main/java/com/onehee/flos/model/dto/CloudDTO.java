package com.onehee.flos.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CloudDTO {
    private Long ownerId;
    private Long contributorId;
}
