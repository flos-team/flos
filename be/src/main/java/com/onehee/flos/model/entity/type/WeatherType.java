package com.onehee.flos.model.entity.type;

import lombok.Getter;

@Getter
public enum WeatherType {
    NONE("날씨없음"), SUNNY("햇빛"), CLOUDY("구름"), RAINY("빗물");

    private final String name;

    WeatherType(String name) {
        this.name = name;
    }
}