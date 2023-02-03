package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FlowerCreateRequestDTO {

    private String name;
    private FlowerType flowerType;

    public Flower toEntity(Member owner) {
        return Flower.builder()
                .owner(owner)
                .name(this.getName())
                .flowerType(this.getFlowerType())
                .build();
    }

}
