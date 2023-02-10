package com.onehee.flos.util;

import com.onehee.flos.model.entity.type.FlowerType;

import java.util.Random;

public class RandomFlowerTypeSelector {
    public static FlowerType getRandomSunnyType() {
        return switch (new Random().nextInt(100) % 4) {
            case 0 -> FlowerType.TulipPurple;
            case 1 -> FlowerType.TulipRed;
            case 2 -> FlowerType.TulipYellow;
            case 3 -> FlowerType.TulipGrapefruit;
            default -> null;
        };
    }
    public static FlowerType getRandomCloudyType() {
        return switch (new Random().nextInt(100) % 3) {
            case 0 -> FlowerType.TulipPink;
            case 1 -> FlowerType.TulipBlue;
            case 2 -> FlowerType.TulipWhite;
            default -> null;
        };
    }
    public static FlowerType getRandomRainyType() {
        return switch (new Random().nextInt(100) % 3) {
            case 0 -> FlowerType.TulipOrange;
            case 1 -> FlowerType.TulipMango;
            case 2 -> FlowerType.TulipGreen;
            default -> null;
        };
    }
}
