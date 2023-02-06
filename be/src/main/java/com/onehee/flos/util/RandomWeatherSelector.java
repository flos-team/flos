package com.onehee.flos.util;

import com.onehee.flos.model.entity.type.WeatherType;

import java.util.Random;

public class RandomWeatherSelector {
    public static WeatherType getRandomWeather() {
        if (new Random().nextInt(100) % 2 == 1) {
            return WeatherType.SUNNY;
        }
        return WeatherType.RAINY;
    }
}
