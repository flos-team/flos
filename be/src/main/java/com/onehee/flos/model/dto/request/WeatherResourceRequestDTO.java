package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.type.ResourceType;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder
public class WeatherResourceRequestDTO {
    private final Long owner_id;
    private final Long contributor_id;
    private final Long post_id;
    private final ResourceType resourceType;
}
