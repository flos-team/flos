package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
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
    private Member owner;
    private String name;
    private LocalDateTime createdAt;

    public static FlowerResponseDTO toDto(Flower flower) {
        return FlowerResponseDTO.builder()
                .id(flower.getId())
                .owner(flower.getOwner())
                .name(flower.getName())
                .createdAt(flower.getCreatedAt())
                .build();
    }
}
