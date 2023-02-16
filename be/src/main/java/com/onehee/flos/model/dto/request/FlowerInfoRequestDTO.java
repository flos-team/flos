package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "꽃 정보 요청 DTO")
public class FlowerInfoRequestDTO {
    @Schema(description = "찾을 꽃의 pk")
    private Long id;
}
