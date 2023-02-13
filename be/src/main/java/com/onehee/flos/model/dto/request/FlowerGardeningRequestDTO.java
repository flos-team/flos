package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "플라워링 요청 DTO")
public class FlowerGardeningRequestDTO {
    @Schema(description = "플라워링할 대상 꽃의 pk")
    private Long id;
}
