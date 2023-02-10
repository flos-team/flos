package com.onehee.flos.model.dto.request;

import lombok.*;

@Data
public class UnfollowRequestDTO {
    private final Long id;
    private final boolean orderByName;
}
