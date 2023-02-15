package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Flower;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "꽃 정보")
public class FlowerResponseDTO {
    @Schema(description = "꽃의 pk")
    private Long id;
    @Schema(description = "꽃 주인 정보")
    private MemberResponseDTO owner;
    @Schema(description = "꽃 종류")
    private String flowerType;
    @Schema(description = "꽃말")
    private String flowerMeaning;
    @Schema(description = "꽃 색")
    private String flowerColor;
    @Schema(description = "성장한 꽃의 칭호")
    private String flowerState;
    @Schema(description = "꽃의 길이")
    private Long height;
    @Schema(description = "꽃의 이름")
    private String name;
    @Schema(description = "꽃이 다 성장했는지 여부")
    private Boolean isFullGrown;
    @Schema(description = "성장한 꽃이 가든으로 갔는지 여부")
    private Boolean gardening;
    @Schema(description = "꽃이 생성된 시간")
    private LocalDateTime createdAt;
    @Schema(description = "꽃이 다 성장한 시간")
    private LocalDateTime blossomAt;
    @Schema(description = "꽃을 키운 시간")
    private Long duration;
    @Schema(description = "꽃을 다 성장시키기 위한 수치")
    private Long capacity;
    @Schema(description = "꽃에 사용한 자원의 수")
    private int currentGrowValue;
    @Schema(description = "꽃에 사용된 물 수")
    private int water;
    @Schema(description = "꽃에 사용된 햇빛 수")
    private int light;
    @Schema(description = "꽃에게 보내는 마지막 편지")
    private String letter;
    @Schema(description = "꽃에게 보내는 마지막 편지를 보냈는지 여부")
    private Boolean lettering;


    public static FlowerResponseDTO toDto(Flower flower) {

        return FlowerResponseDTO.builder()
                .isFullGrown(flower.getCapacity() <= (flower.getWater() + flower.getLight()))
                .gardening(flower.getGardening())
                .id(flower.getId())
                .owner(MemberResponseDTO.toDto(flower.getOwner()))
                .flowerType(flower.getFlowerType().getFlowerType())
                .flowerMeaning(flower.getFlowerType().getFlowerMeaning())
                .flowerColor(flower.getFlowerType().getColor())
                .flowerState(flower.getState() == null ? null : flower.getState().getState())
                .height(flower.getHeight())
                .name(flower.getName())
                .currentGrowValue(flower.getWater() + flower.getLight())
                .water(flower.getWater())
                .light(flower.getLight())
                .capacity(flower.getCapacity())
                .createdAt(flower.getCreatedAt())
                .blossomAt(flower.getBlossomAt())
                .duration(flower.getBlossomAt() == null ? null : ChronoUnit.DAYS.between(flower.getCreatedAt(), flower.getBlossomAt()))
                .letter(flower.getLetter())
                .lettering(flower.getLettering())
                .build();

    }
}
