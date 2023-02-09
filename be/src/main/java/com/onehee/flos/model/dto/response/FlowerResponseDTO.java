package com.onehee.flos.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.FlowerType;
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
public class FlowerResponseDTO {
    private Long id;
    private MemberResponseDTO owner;
    private String flowerType;
    private String flowerMeaning;
    private String flowerColor;
    private String flowerState;
    private Long height;
    private String name;
    private Boolean isFullGrown;
    private Boolean gardening;
    private LocalDateTime createdAt;
    private LocalDateTime blossomAt;
    private Long duration;
    private Long capacity;
    private int currentGrowValue;
    @JsonIgnore
    private int water;
    @JsonIgnore
    private int light;

    public static FlowerResponseDTO toDto(Flower flower) {

        return FlowerResponseDTO.builder()
                .isFullGrown(flower.getCapacity() <= (flower.getWater() + flower.getLight()))
                .gardening(flower.getGardening())
                .id(flower.getId())
                .owner(MemberResponseDTO.toDto(flower.getOwner()))
                .flowerType(flower.getFlowerType().getFlowerType())
                .flowerMeaning(flower.getFlowerType().getFlowerMeaning())
                .flowerColor(flower.getFlowerType().getColor())
                .flowerState(flower.getState()==null?null:flower.getState().getState())
                .height(flower.getHeight())
                .name(flower.getName())
                .currentGrowValue(flower.getWater() + flower.getLight())
                .capacity(flower.getCapacity())
                .createdAt(flower.getCreatedAt())
                .blossomAt(flower.getBlossomAt())
                .duration(flower.getBlossomAt() == null ? null : ChronoUnit.DAYS.between(flower.getCreatedAt(), flower.getBlossomAt()))
                .build();

    }
}
