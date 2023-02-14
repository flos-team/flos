package com.onehee.flos.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "최고 기여자 DTO")
public class BestContributorResponseDTO {
    @Schema(description = "꽃 정보 DTO")
    private FlowerResponseDTO flower;
    @Schema(description = "기여자 DTO")
    private MemberResponseDTO contributor;
    @Schema(description = "기여 횟수")
    private Long contributeCounter;
}
