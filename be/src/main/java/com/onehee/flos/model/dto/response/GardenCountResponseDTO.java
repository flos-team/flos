package com.onehee.flos.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GardenCountResponseDTO {
    private Long flowerCount;

    public static GardenCountResponseDTO toDto(long count) {
        return GardenCountResponseDTO.builder()
                .flowerCount(count)
                .build();
    }
}
