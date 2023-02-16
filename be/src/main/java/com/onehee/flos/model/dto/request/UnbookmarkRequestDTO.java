package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "북마크 요청 DTO")
public class UnbookmarkRequestDTO {
    @Schema(description = "북마크 해제 대상 게시글의 pk")
    private Long id;
}