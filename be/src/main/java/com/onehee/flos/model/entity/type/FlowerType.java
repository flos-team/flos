package com.onehee.flos.model.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FlowerType {
    F001("Type", "Flower lang", 50);

    private final String flowerType;
    private final String flowerMeaning;
    private final Integer flowerMaxGrowth;
}
