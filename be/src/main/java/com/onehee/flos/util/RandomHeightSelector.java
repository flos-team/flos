package com.onehee.flos.util;

import com.onehee.flos.model.entity.type.WeatherType;

import java.util.Random;

public class RandomHeightSelector {
    public static Long getRandomWeather() {
        return new Random().nextInt(100) % 81 + 20L;
    }
}
