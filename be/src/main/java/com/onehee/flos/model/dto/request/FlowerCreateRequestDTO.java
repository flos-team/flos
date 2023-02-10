package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.FlowerType;
import com.onehee.flos.util.RandomHeightSelector;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "꽃 생성 DTO")
public class FlowerCreateRequestDTO {

    @Schema(description = "꽃의 이름")
    private String name;
    @Schema(description = "꽃의 종류", defaultValue = "Tulip", example = "TulipRed")
    private FlowerType flowerType;

    public Flower toEntity(Member owner) {
        return Flower.builder()
                .owner(owner)
                .name(this.getName())
                .flowerType(this.getFlowerType())
                .height(RandomHeightSelector.getRandomWeather())
                .build();
    }

}
