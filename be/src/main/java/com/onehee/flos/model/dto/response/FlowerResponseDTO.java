package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlowerResponseDTO {
    private Long id;
    private MemberResponseDTO owner;
    private FlowerType flowerType;
    private String name;
    private LocalDateTime createdAt;

    public static FlowerResponseDTO toDto(Flower flower) {
        return FlowerResponseDTO.builder()
                .id(flower.getId())
                .owner(MemberResponseDTO.toDto(flower.getOwner()))
                .flowerType(flower.getFlowerType())
                .name(flower.getName())
                .createdAt(flower.getCreatedAt())
                .build();
    }
}
