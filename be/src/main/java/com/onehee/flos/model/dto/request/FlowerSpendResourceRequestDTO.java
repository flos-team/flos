package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.type.ResourceType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FlowerSpendResourceRequestDTO {
    private final ResourceType resourceType;
}
